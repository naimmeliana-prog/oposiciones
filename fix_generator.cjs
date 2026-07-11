const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /if \(testDifficulty === "fácil" \|\| typeIndex === 0\) \{[\s\S]*?\}\s*simulatedQuestions\.push\(\{/m;

const replacement = `const concepts = randomTheme.keyConcepts && randomTheme.keyConcepts.length > 0 ? randomTheme.keyConcepts : [randomTheme.title];
        const concept = concepts[Math.floor(Math.random() * concepts.length)];
        const dummyConcepts = [
          "Aplicación retroactiva restrictiva", 
          "Revisión de oficio", 
          "Infracción muy grave", 
          "Procedimiento ordinario de control", 
          "Suspensión cautelar", 
          "Delegación de competencias",
          "Intervención de terceros",
          "Silencio negativo",
          "Excepciones de fuerza mayor",
          "Consentimiento informado expreso",
          "Medidas preventivas estándar"
        ];
        
        let fake1 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        let fake2 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        let fake3 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        
        while(fake1 === fake2 || fake1 === fake3 || fake2 === fake3) {
           fake2 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
           fake3 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        }

        if (testDifficulty === "fácil" || typeIndex === 0) {
            statement = \`En relación a "\${randomTheme.title}", ¿cuál de los siguientes elementos es considerado fundamental respecto a "\${concept}" en el ámbito de \${activeOpposition.name}?\`;
            options = {
              A: \`Constituye el pilar esencial de \${concept} para asegurar la correcta aplicación de \${randomTheme.title}.\`,
              B: \`La jurisprudencia y doctrina indican que \${fake1} es el único elemento válido.\`,
              C: \`Se rige por el principio de \${fake2} sin excepciones.\`,
              D: \`La exclusión de \${concept} en favor de \${fake3}.\`
            };
            correctOption = "A";
            explanation = \`El concepto de \${concept} es nuclear dentro del tema de \${randomTheme.title} para \${activeOpposition.name}.\`;
        } else if (testDifficulty === "medio" || typeIndex === 1) {
            statement = \`Según la normativa vigente relativa a \${randomTheme.title}, ¿qué ocurre cuando se detecta una irregularidad formal asociada a "\${concept}"?\`;
            options = {
              A: \`Conlleva de manera automática \${fake1} sin posibilidad de subsanación.\`,
              B: \`Se activa el mecanismo corrector de \${concept}, permitiendo la subsanación o revisión si se justifica adecuadamente.\`,
              C: \`Se delega directamente en \${fake2} para su resolución.\`,
              D: \`Provoca \${fake3} de forma inmediata.\`
            };
            correctOption = "B";
            explanation = \`Ante irregularidades sobre \${concept}, el ordenamiento suele prever mecanismos de subsanación o corrección motivada.\`;
        } else if (testDifficulty === "difícil" || typeIndex === 2) {
            statement = \`En un supuesto complejo de \${activeOpposition.name} donde interactúan "\${concept}" y las disposiciones de \${randomTheme.title} (\${randomTheme.articles || 'Normativa aplicable'}), indique la afirmación correcta:\`;
            options = {
              A: \`Siempre prevalece \${fake1} sobre cualquier consideración técnica.\`,
              B: \`Se aplicará subsidiariamente \${fake2} si \${concept} no está definido.\`,
              C: \`Su aplicación es restrictiva, requiriendo acreditación expresa de \${concept} para no incurrir en nulidad o vulneración.\`,
              D: \`El órgano competente debe ignorar \${concept} en virtud de \${fake3}.\`
            };
            correctOption = "C";
            explanation = \`Por su naturaleza, la aplicación de \${concept} en el marco de \${randomTheme.title} requiere precisión y acreditación explícita.\`;
        } else {
            statement = \`Respecto a \${randomTheme.title}, señale la opción correcta en cuanto al desarrollo práctico de "\${concept}":\`;
            options = {
              A: \`Su desarrollo corresponde exclusivamente al departamento de \${fake1}.\`,
              B: \`Implica la aplicación directa de \${concept} conforme a los protocolos oficiales de \${activeOpposition.name}.\`,
              C: \`Queda invalidado si entra en conflicto con \${fake2}.\`,
              D: \`Debe someterse siempre a \${fake3} antes de su ejecución.\`
            };
            correctOption = "B";
            explanation = \`El desarrollo de \${concept} se debe guiar estrictamente por los protocolos vigentes establecidos en \${randomTheme.title}.\`;
        }

        simulatedQuestions.push({`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
