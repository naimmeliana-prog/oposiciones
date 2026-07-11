const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find all map functions and add keys if missing
const babel = require('@babel/core');

const out = babel.transformSync(code, {
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    function myCustomPlugin() {
      return {
        visitor: {
          CallExpression(path) {
            if (
              path.node.callee.property &&
              path.node.callee.property.name === 'map'
            ) {
              const arg = path.node.arguments[0];
              if (arg && (arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression')) {
                const body = arg.body;
                
                // If body is JSXElement or JSXFragment
                if (body.type === 'JSXElement') {
                  const openingElement = body.openingElement;
                  const hasKey = openingElement.attributes.some(attr => attr.name && attr.name.name === 'key');
                  
                  if (!hasKey) {
                    console.log('Missing key in map line ' + path.node.loc.start.line);
                  }
                } else if (body.type === 'BlockStatement') {
                  // check for return statement with JSXElement
                  body.body.forEach(stmt => {
                    if (stmt.type === 'ReturnStatement' && stmt.argument && stmt.argument.type === 'JSXElement') {
                      const openingElement = stmt.argument.openingElement;
                      const hasKey = openingElement.attributes.some(attr => attr.name && attr.name.name === 'key');
                      if (!hasKey) {
                        console.log('Missing key in map line ' + path.node.loc.start.line);
                      }
                    }
                  });
                }
              }
            }
          }
        }
      };
    }
  ]
});
