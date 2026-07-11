const ts = require('typescript');
const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');
const sourceFile = ts.createSourceFile('src/App.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function visit(node) {
  if (ts.isCallExpression(node)) {
    if (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 'map') {
      const arg = node.arguments[0];
      if (arg && (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg))) {
        const body = arg.body;
        
        let targetNode = null;
        if (ts.isJsxElement(body)) {
          targetNode = body.openingElement;
        } else if (ts.isJsxSelfClosingElement(body)) {
          targetNode = body;
        } else if (ts.isJsxFragment(body)) {
           const { line } = sourceFile.getLineAndCharacterOfPosition(body.getStart());
           console.log("Map returns Fragment without key at line", line + 1);
        } else if (ts.isParenthesizedExpression(body)) {
            if (ts.isJsxElement(body.expression)) {
                targetNode = body.expression.openingElement;
            } else if (ts.isJsxSelfClosingElement(body.expression)) {
                targetNode = body.expression;
            } else if (ts.isJsxFragment(body.expression)) {
               const { line } = sourceFile.getLineAndCharacterOfPosition(body.getStart());
               console.log("Map returns Fragment without key at line", line + 1);
            }
        } else if (ts.isBlock(body)) {
           // check for return statement
           const retStmt = body.statements.find(ts.isReturnStatement);
           if (retStmt && retStmt.expression) {
             let expr = retStmt.expression;
             if (ts.isParenthesizedExpression(expr)) {
               expr = expr.expression;
             }
             if (ts.isJsxElement(expr)) {
               targetNode = expr.openingElement;
             } else if (ts.isJsxSelfClosingElement(expr)) {
               targetNode = expr;
             } else if (ts.isJsxFragment(expr)) {
               const { line } = sourceFile.getLineAndCharacterOfPosition(expr.getStart());
               console.log("Map returns Fragment without key at line", line + 1);
             }
           }
        }
        
        if (targetNode) {
          const hasKey = targetNode.attributes.properties.some(p => ts.isJsxAttribute(p) && p.name.text === 'key');
          if (!hasKey) {
            const { line } = sourceFile.getLineAndCharacterOfPosition(targetNode.getStart());
            console.log("Missing key at line", line + 1);
          }
        }
      }
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);
