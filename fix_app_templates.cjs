const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexMedio = /const templatesMedio = \[\n            \{\n               s: \`Según la normativa vigente relativa a \$\{randomTheme\.title\}, \¿qué ocurre cuando se detecta una irregularidad formal asociada a "\$\{concept\}"\?\`,\n               c: \`Se activa el mecanismo corrector, permitiendo la subsanación o revisión si se justifica adecuadamente\.\`,\n               e: \`Ante irregularidades sobre \$\{concept\}, el ordenamiento suele prever mecanismos de subsanación o corrección motivada\.\`\n            \},\n            \{\n               s: \`Dentro de \$\{activeOpposition\.name\}, si un administrado solicita la ejecución de "\$\{concept\}" amparándose en \$\{randomTheme\.title\}:\`,\n               c: \`Se tramitará según el procedimiento específico regulado en la normativa de aplicación\.\`,\n               e: \`La solicitud siempre debe ajustarse al procedimiento estipulado por la ley aplicable a \$\{concept\}\.\`\n            \}\n        \];/;

const replacementMedio = `const templatesMedio = [
            {
               s: \`Según los principios vigentes relativos a \${randomTheme.title}, ¿qué ocurre ante una situación inusual asociada a "\${concept}"?\`,
               c: \`Se debe evaluar la situación y aplicar las medidas de corrección u optimización según los protocolos establecidos.\`,
               e: \`Ante variaciones sobre \${concept}, se deben aplicar los protocolos o mecanismos de adaptación previstos.\`
            },
            {
               s: \`Dentro de \${activeOpposition.name}, si se requiere la ejecución de "\${concept}" en el contexto de \${randomTheme.title}:\`,
               c: \`Se ejecutará siguiendo las pautas y procedimientos técnicos o legales específicos vigentes.\`,
               e: \`Toda ejecución debe ajustarse a las normativas técnicas o protocolos aplicables a \${concept}.\`
            }
        ];`;

const regexDificil = /const templatesDificil = \[\n            \{\n               s: \`En un supuesto complejo de \$\{activeOpposition\.name\} donde interactúan "\$\{concept\}" y las disposiciones de \$\{randomTheme\.title\}, indique la afirmación correcta:\`,\n               c: \`Su aplicación requiere acreditación expresa de \$\{concept\} para no incurrir en nulidad o vulneración\.\`,\n               e: \`Por su naturaleza, la aplicación de \$\{concept\} requiere precisión y acreditación explícita\.\`\n            \},\n            \{\n               s: \`Considerando la jurisprudencia aplicable a \$\{randomTheme\.title\}, si confluyen simultáneamente \$\{fake1\} y "\$\{concept\}", la actuación administrativa correcta será:\`,\n               c: \`Aplicar de forma preferente y prioritaria las medidas inherentes a \$\{concept\} por su carácter específico\.\`,\n               e: \`En caso de conflicto, predomina el precepto específico relacionado con \$\{concept\} sobre las disposiciones generales\.\`\n            \}\n        \];/;

const replacementDificil = `const templatesDificil = [
            {
               s: \`En un supuesto complejo de \${activeOpposition.name} donde interactúan "\${concept}" y los principios de \${randomTheme.title}, indique la afirmación correcta:\`,
               c: \`Su intervención requiere justificación técnica o legal de \${concept} para asegurar su validez.\`,
               e: \`Por su naturaleza, el manejo de \${concept} requiere precisión y justificación explícita.\`
            },
            {
               s: \`Considerando los fundamentos de \${randomTheme.title}, si confluyen simultáneamente \${fake1} y "\${concept}", la actuación profesional correcta será:\`,
               c: \`Aplicar de forma preferente las medidas inherentes a \${concept} debido a su especialidad.\`,
               e: \`En caso de conflicto o concurrencia, suele predominar el criterio específico relacionado con \${concept}.\`
            }
        ];`;

code = code.replace(regexMedio, replacementMedio);
code = code.replace(regexDificil, replacementDificil);
fs.writeFileSync('src/App.tsx', code);
