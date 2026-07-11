import { Opposition } from "../types";

export const OPPOSITIONS_LIST: Opposition[] = [
  {
    id: "op-medico-familia",
    name: "Médico de Familia de Atención Primaria",
    reference: "OEP-SANIDAD-2026-MF",
    deadline: "Abierto",
    group: "A1",
    accessType: "Concurso-oposición",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal Estatutario",
    examType: "Concurso-oposición",
    degree: "Título universitario de Medicina y especialidad en Medicina Familiar y Comunitaria",
    description: "Personal estatutario de los servicios de salud encargado de la atención primaria y comunitaria.",
    totalPlaces: 1850,
    officialExamsCount: 6
  },
  {
    id: "op-celador",
    name: "Celador de Instituciones Sanitarias",
    reference: "OEP-SANIDAD-2026-CEL",
    deadline: "Abierto",
    group: "E",
    accessType: "Concurso-oposición",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal Estatutario",
    examType: "Concurso-oposición",
    degree: "Certificado de Escolaridad o equivalente",
    description: "Personal subalterno de los servicios de salud que asiste en el traslado de pacientes, movilización y tareas auxiliares en hospitales y centros de salud.",
    totalPlaces: 2300,
    officialExamsCount: 8
  },
  {
    id: "op-tramitacion",
    name: "Cuerpo de Tramitación Procesal y Administrativa (Justicia)",
    reference: "OEP-JUSTICIA-2026-04",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Cuerpo de la Administración de Justicia encargado de la ordenación y tramitación de los expedientes, citaciones, emplazamientos, y auxilio a las Oficinas Judiciales de todo el territorio nacional.",
    totalPlaces: 1250,
    officialExamsCount: 5
  },
  {
    id: "op-aux-age",
    name: "Cuerpo General Auxiliar de la Administración del Estado",
    reference: "AGE-AUX-2026-01",
    deadline: "Abierto",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de graduado/a en educación secundaria obligatoria (ESO) o equivalentes",
    description: "Funciones de carácter administrativo, ofimático, archivo, registro de entrada/salida y atención al ciudadano en los diferentes ministerios y delegaciones del Gobierno español.",
    totalPlaces: 1950,
    officialExamsCount: 4
  },
  {
    id: "op-epso-admin",
    name: "Administradores de la Comisión Europea (EPSO AD 5)",
    reference: "EPSO/AD/411/26",
    deadline: "Abierto",
    group: "A1",
    accessType: "Turno libre",
    disability: "Ninguna",
    body: "Internacional",
    location: {
      country: "Bruselas, Luxemburgo"
    },
    personalType: "Personal funcionario",
    examType: "Concurso-oposición",
    degree: "Título universitario de grado o bien licenciatura, ingeniería superior o arquitectura o equivalentes (subgrupo 1)",
    description: "Cargos de formulación de políticas, análisis de datos, gestión de proyectos y relaciones exteriores de las instituciones de la Unión Europea (Comisión, Consejo, Parlamento).",
    totalPlaces: 180,
    officialExamsCount: 3
  },
  {
    id: "op-policia",
    name: "Escala Básica de la Policía Nacional",
    reference: "CNP-EB-2026-09",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "Ninguna",
    body: "Estatal",
    location: {
      autonomy: "Todas"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Ingreso en las fuerzas de seguridad del Estado para labores de patrullaje, seguridad ciudadana, investigación policial inicial y orden público.",
    totalPlaces: 2600,
    officialExamsCount: 2
  },
  {
    id: "op-aux-madrid",
    name: "Auxiliar Administrativo de la Comunidad de Madrid",
    reference: "CAM-AUX-2026-44",
    deadline: "Abierto",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Comunidad de Madrid",
      province: "Madrid",
      municipality: "Madrid"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de graduado/a en educación secundaria obligatoria (ESO) o equivalentes",
    description: "Gestión de trámites autonómicos de salud, educación y servicios generales en la estructura administrativa de la Comunidad de Madrid.",
    totalPlaces: 310,
    officialExamsCount: 3
  },
  {
    id: "op-tecnico-hacienda",
    name: "Cuerpo Técnico de Hacienda (Agencia Tributaria)",
    reference: "AEAT-TH-2026-03",
    deadline: "Cerrado",
    group: "A2",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título universitario de grado o bien diplomatura, ingeniería técnica o arquitectura técnica o equivalente (subgrupo 2)",
    description: "Inspección, control tributario, recaudación de impuestos y asesoramiento en el marco de la Agencia Estatal de Administración Tributaria (AEAT).",
    totalPlaces: 460,
    officialExamsCount: 3
  },
  {
    id: "op-aux-sevilla",
    name: "Auxiliar Administrativo del Ayuntamiento de Sevilla",
    reference: "SEV-AUX-2025-11",
    deadline: "Cerrado",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Local",
    location: {
      autonomy: "Andalucía",
      province: "Sevilla",
      municipality: "Sevilla"
    },
    personalType: "Personal funcionario",
    examType: "Concurso-oposición",
    degree: "Certificado de escolaridad o Graduado en educación secundaria obligatoria o equivalente",
    description: "Tareas de atención telefónica, tramitación de licencias municipales, padrón de habitantes e información vecinal en las oficinas de atención del Ayuntamiento de Sevilla.",
    totalPlaces: 45,
    officialExamsCount: 2
  },
  {
    id: "op-administrativo-ub",
    name: "Cuerpo de Administrativos de la Universidad de Barcelona",
    reference: "UB-ADM-2026-02",
    deadline: "Abierto",
    group: "C1",
    accessType: "Promoción interna",
    disability: "General",
    body: "Universidades",
    location: {
      autonomy: "Cataluña",
      province: "Barcelona",
      municipality: "Barcelona"
    },
    personalType: "Personal funcionario",
    examType: "Concurso-oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Personal de gestión académica, matrícula estudiantil, secretaría de facultades, y apoyo a proyectos de investigación en el ámbito de la Universidad de Barcelona.",
    totalPlaces: 85,
    officialExamsCount: 1
  },
  {
    id: "op-enfermeria-valencia",
    name: "Auxiliar de Enfermería - Servicio Valenciano de Salud (TCAE)",
    reference: "GVA-SVS-2025-90",
    deadline: "Abierto",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Comunidad Valenciana",
      province: "Valencia",
      municipality: "Valencia"
    },
    personalType: "Personal Estatutario",
    examType: "Concurso-oposición",
    degree: "Título de técnico/a superior de formación profesional o equivalentes",
    description: "Cuidados auxiliares de enfermería en hospitales y centros de atención primaria dependientes de la Conselleria de Sanitat de la Generalitat Valenciana.",
    totalPlaces: 1200,
    officialExamsCount: 2
  },
  {
    id: "op-comision-ast",
    name: "Oficial Administrativo de la Comisión Europea (AST 3)",
    reference: "EPSO/AST/215/26",
    deadline: "Abierto",
    group: "B",
    accessType: "Bolsa de trabajo",
    disability: "Ninguna",
    body: "Internacional",
    location: {
      country: "Bruselas"
    },
    personalType: "Personal funcionario",
    examType: "Concurso: prueba técnica, entrevista",
    degree: "Título de técnico/a superior de formación profesional o equivalentes",
    description: "Apoyo operativo en informática, logística, administración de personal o finanzas en los departamentos centrales de la Comisión Europea.",
    totalPlaces: 50,
    officialExamsCount: 1
  },
  {
    id: "op-operario-vigo",
    name: "Operarios de Servicios Múltiples de Vigo",
    reference: "VIG-OP-2026-01",
    deadline: "Abierto",
    group: "APF",
    accessType: "Turno libre",
    disability: "Intelectual",
    body: "Local",
    location: {
      autonomy: "Galicia",
      province: "Pontevedra",
      municipality: "Vigo"
    },
    personalType: "Personal Laboral",
    examType: "Prueba de aptitud / Valoración de méritos",
    degree: "Agrupaciones profesionales funcionariales (APF) sin requisito de titulación (antiguo grupo E)",
    description: "Mantenimiento general de vías públicas, jardinería municipal, custodia de colegios públicos e instalaciones deportivas de la ciudad de Vigo.",
    totalPlaces: 30,
    officialExamsCount: 1
  },
  {
    id: "op-admin-estado",
    name: "Cuerpo General Administrativo de la Administración del Estado",
    reference: "AGE-ADM-2026-02",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Funciones de tramitación de expedientes, recursos, atención e información administrativa de mayor nivel de complejidad en los ministerios.",
    totalPlaces: 1450,
    officialExamsCount: 3
  },
  {
    id: "op-gest-estado",
    name: "Cuerpo de Gestión de la Administración Civil del Estado",
    reference: "AGE-GEST-2026-05",
    deadline: "Abierto",
    group: "A2",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título universitario de grado o diplomatura equivalente (subgrupo 2)",
    description: "Funciones ejecutivas, de colaboración en tareas de nivel superior, y de gestión de políticas sectoriales de la Administración del Estado.",
    totalPlaces: 820,
    officialExamsCount: 2
  },
  {
    id: "op-aux-catalunya",
    name: "Auxiliar Administrativo de la Generalitat de Catalunya",
    reference: "GEN-AUX-2026-12",
    deadline: "Abierto",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Cataluña",
      province: "Barcelona, Tarragona, Lleida, Girona",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de graduado/a en educación secundaria obligatoria (ESO) o equivalentes",
    description: "Atención ciudadana, registro de documentos y apoyo operativo a las delegaciones territoriales de la Generalitat de Catalunya.",
    totalPlaces: 450,
    officialExamsCount: 2
  },
  {
    id: "op-adm-andalucia",
    name: "Cuerpo de Administrativos de la Junta de Andalucía",
    reference: "AND-ADM-2026-08",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Andalucía",
      province: "Sevilla, Málaga, Córdoba, Granada",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Gestión administrativa en consejerías, servicios periféricos y delegaciones provinciales de la Junta de Andalucía.",
    totalPlaces: 600,
    officialExamsCount: 2
  },
  {
    id: "op-maestros-galicia",
    name: "Cuerpo de Maestros de Educación Primaria de Galicia",
    reference: "GAL-MAE-2026-14",
    deadline: "Abierto",
    group: "A2",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Galicia",
      province: "A Coruña, Lugo, Ourense, Pontevedra",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Concurso-oposición",
    degree: "Título universitario de Grado en Educación Primaria o Magisterio equivalente",
    description: "Docencia en el sistema público escolar de enseñanza primaria obligatorio dependiente de la Xunta de Galicia.",
    totalPlaces: 920,
    officialExamsCount: 1
  },
  {
    id: "op-enf-madrid",
    name: "Enfermero/a del Servicio Madrileño de Salud (SERMAS)",
    reference: "CAM-ENF-2025-33",
    deadline: "Abierto",
    group: "A2",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Comunidad de Madrid",
      province: "Madrid",
      municipality: "Madrid"
    },
    personalType: "Personal Estatutario",
    examType: "Concurso-oposición",
    degree: "Título universitario oficial de Grado en Enfermería o Diplomatura correspondiente",
    description: "Atención sanitaria especializada e integrada en hospitales públicos y centros asistenciales del Servicio Madrileño de Salud.",
    totalPlaces: 1100,
    officialExamsCount: 2
  },
  {
    id: "op-bomber-zaragoza",
    name: "Bomberos del Ayuntamiento de Zaragoza",
    reference: "ZAR-BOM-2026-01",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "Ninguna",
    body: "Local",
    location: {
      autonomy: "Aragón",
      province: "Zaragoza",
      municipality: "Zaragoza"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Prevención, extinción de incendios y salvamento en el ámbito del término municipal de Zaragoza.",
    totalPlaces: 40,
    officialExamsCount: 2
  },
  {
    id: "op-guardia-urbana",
    name: "Guardia Urbana del Ayuntamiento de Barcelona",
    reference: "BCN-GU-2026-07",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "Ninguna",
    body: "Local",
    location: {
      autonomy: "Cataluña",
      province: "Barcelona",
      municipality: "Barcelona"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Labores de policía local, seguridad vial, protección ciudadana y civismo urbano en la ciudad de Barcelona.",
    totalPlaces: 150,
    officialExamsCount: 2
  },
  {
    id: "op-celador-sas",
    name: "Celador del Servicio Andaluz de Salud (SAS)",
    reference: "AND-CEL-2025-41",
    deadline: "Abierto",
    group: "APF",
    accessType: "Turno libre",
    disability: "General",
    body: "Autonómico",
    location: {
      autonomy: "Andalucía",
      province: "Sevilla",
      municipality: "Todos"
    },
    personalType: "Personal Estatutario",
    examType: "Concurso-oposición",
    degree: "Agrupaciones profesionales funcionariales (APF) sin requisito de titulación (antiguo grupo E)",
    description: "Traslado de enfermos, custodia de accesos, auxilio al personal médico y de enfermería en centros asistenciales del SAS.",
    totalPlaces: 850,
    officialExamsCount: 2
  },
  {
    id: "op-laj",
    name: "Letrado de la Administración de Justicia (Justicia)",
    reference: "OEP-JUSTICIA-LAJ-2026",
    deadline: "Abierto",
    group: "A1",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título universitario oficial de Licenciado o Graduado en Derecho",
    description: "Funciones de dirección de la oficina judicial, fe pública judicial y ordenación del procedimiento procesal civil y penal.",
    totalPlaces: 180,
    officialExamsCount: 3
  },
  {
    id: "op-auxilio-judicial",
    name: "Cuerpo de Auxilio Judicial (Justicia)",
    reference: "OEP-JUSTICIA-AUX-2026",
    deadline: "Abierto",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de graduado/a en educación secundaria obligatoria (ESO) o equivalentes",
    description: "Funciones de ejecución de embargos, lanzamientos, notificaciones, citaciones y mantenimiento del orden en las salas de vistas.",
    totalPlaces: 950,
    officialExamsCount: 4
  },
  {
    id: "op-auditoria-tcu",
    name: "Cuerpo de Técnicos de Auditoría del Tribunal de Cuentas",
    reference: "TCU-TEC-2026-01",
    deadline: "Abierto",
    group: "A2",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Madrid",
      municipality: "Madrid"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título universitario de grado, licenciatura, diplomatura o equivalente (subgrupo 2)",
    description: "Examen de la contabilidad de los partidos políticos, control económico-financiero y fiscalización del sector público.",
    totalPlaces: 45,
    officialExamsCount: 1
  },
  {
    id: "op-cons-museos",
    name: "Conservador de Museos de la Administración del Estado",
    reference: "CUL-CON-2026-03",
    deadline: "Abierto",
    group: "A1",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Madrid",
      municipality: "Madrid"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título universitario oficial de Grado o Licenciatura (Historia, Bellas Artes, etc.)",
    description: "Investigación, catalogación, conservación preventiva y difusión de colecciones museísticas de titularidad estatal.",
    totalPlaces: 25,
    officialExamsCount: 1
  },
  {
    id: "op-ahp",
    name: "Agente de la Hacienda Pública (Agencia Tributaria)",
    reference: "AEAT-AHP-2026-02",
    deadline: "Abierto",
    group: "C1",
    accessType: "Turno libre",
    disability: "General",
    body: "Estatal",
    location: {
      autonomy: "Todas",
      province: "Todas",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Oposición",
    degree: "Título de bachiller o técnico/a de formación profesional o equivalentes",
    description: "Funciones preparatorias y de apoyo a la inspección tributaria, recaudación y tramitación administrativa en la AEAT.",
    totalPlaces: 380,
    officialExamsCount: 2
  },
  {
    id: "op-aux-upv",
    name: "Auxiliar Administrativo de la Universidad del País Vasco",
    reference: "UPV-AUX-2026-04",
    deadline: "Abierto",
    group: "C2",
    accessType: "Turno libre",
    disability: "General",
    body: "Universidades",
    location: {
      autonomy: "País Vasco",
      province: "Bizkaia, Gipuzkoa, Araba",
      municipality: "Todos"
    },
    personalType: "Personal funcionario",
    examType: "Concurso-oposición",
    degree: "Título de graduado/a en educación secundaria obligatoria (ESO) o equivalentes",
    description: "Apoyo a la gestión académica, secretaría de facultades, atención a estudiantes y registro en la UPV/EHU.",
    totalPlaces: 65,
    officialExamsCount: 1
  }
];
