const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `  // Add Dynamic Convocatoria
  const handleAddNewConvocatoria = (e: FormEvent) => {
    e.preventDefault();
    if (!newConvName.trim() || !newConvYear) return;

    const newId = \`conv-new-\${Date.now()}\`;
    const newExam: OfficialExam = {
      id: newId,
      year: Number(newConvYear),
      name: \`\${newConvName.trim()} (\${Number(newConvYear)})\`,
      date: newConvDate || new Date().toISOString().split("T")[0],
      status: "Nuevo",
      averageScore: 65.0,
      cutOffScore: newConvCutOff,
      totalApplicants: newConvApplicants,
      passedCount: Math.round(newConvApplicants * 0.07),
      themeDistribution: {
        "I": 35,
        "II": 40,
        "III": 25
      },
      questionsCount: 104
    };

    const updatedExams = [newExam, ...officialExams];
    setOfficialExams(updatedExams);
    localStorage.setItem("tramitador_exams", JSON.stringify(updatedExams));

    // Auto-select this newly created convocatoria
    setSelectedConvocatoriaIds([...selectedConvocatoriaIds, newId]);

    // Reset Form
    setNewConvName("");
    setNewConvYear(2026);
    setNewConvDate("");
    setNewConvApplicants(20000);
    setNewConvCutOff(70);
    setShowAddConvForm(false);
  };`;

code = code.replace(targetStr, "");
fs.writeFileSync('src/App.tsx', code);
