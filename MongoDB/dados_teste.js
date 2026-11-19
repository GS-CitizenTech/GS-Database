// Dados de exemplo correspondentes ao dominio do banco Oracle.
// Os identificadores relacionais foram preservados nos campos id_*.
// Para repetir a carga sem duplicar os documentos, limpamos as collections.
const citizenDb = db.getSiblingDB("citizentech_enchentes");

citizenDb.monitoramentos.deleteMany({});
citizenDb.alertas.deleteMany({});

citizenDb.monitoramentos.insertMany([
  {
    id_ponto: 1, codigo: "PT001", nome: "Estacao Centro",
    bairro: "Se", cidade: "Sao Paulo", uf: "SP",
    latitude: -23.5505, longitude: -46.6333, ativo: true,
    leituras: [
      { id_leitura: 1, nivel_agua_cm: 8, chuva_mm: 12,
        elevacao_cm_h: 0.5, data_hora_leitura: ISODate("2026-11-16T14:00:00Z"),
        origem: "SIMULACAO" }
    ]
  },
  {
    id_ponto: 2, codigo: "PT002", nome: "Estacao Tatuape",
    bairro: "Tatuape", cidade: "Sao Paulo", uf: "SP",
    latitude: -23.5400, longitude: -46.5760, ativo: true,
    leituras: [
      { id_leitura: 2, nivel_agua_cm: 18, chuva_mm: 35,
        elevacao_cm_h: 2.5, data_hora_leitura: ISODate("2026-11-16T14:30:00Z"),
        origem: "SIMULACAO" }
    ]
  },
  {
    id_ponto: 3, codigo: "PT003", nome: "Estacao Pinheiros",
    bairro: "Pinheiros", cidade: "Sao Paulo", uf: "SP",
    latitude: -23.5614, longitude: -46.7016, ativo: true,
    leituras: [
      { id_leitura: 3, nivel_agua_cm: null, chuva_mm: 22,
        elevacao_cm_h: null, data_hora_leitura: ISODate("2026-11-16T15:00:00Z"),
        origem: "SIMULACAO" }
    ]
  },
  {
    id_ponto: 4, codigo: "PT004", nome: "Estacao Mooca",
    bairro: "Mooca", cidade: "Sao Paulo", uf: "SP",
    latitude: -23.5600, longitude: -46.6000, ativo: true,
    leituras: [
      { id_leitura: 4, nivel_agua_cm: 42, chuva_mm: 55,
        elevacao_cm_h: 4.2, data_hora_leitura: ISODate("2026-11-16T15:30:00Z"),
        origem: "SIMULACAO" }
    ]
  },
  {
    id_ponto: 5, codigo: "PT005", nome: "Estacao Lapa",
    bairro: "Lapa", cidade: "Sao Paulo", uf: "SP",
    latitude: -23.5220, longitude: -46.7000, ativo: true,
    leituras: [
      { id_leitura: 5, nivel_agua_cm: 5, chuva_mm: 4,
        elevacao_cm_h: 0.2, data_hora_leitura: ISODate("2026-11-16T16:00:00Z"),
        origem: "SIMULACAO" }
    ]
  }
]);

citizenDb.alertas.insertMany([
  {
    id_alerta: 1, id_leitura: 1, id_ponto: 1,
    classificacao: "MODERADO", probabilidade: 45.00,
    mensagem_explicativa: "Chuva moderada registrada no ponto de monitoramento.",
    status: "ATIVO", data_geracao: ISODate("2026-11-16T14:05:00Z"),
    auditoria: [{ operacao: "INSERT", status_anterior: null,
      status_novo: "ATIVO", data_operacao: ISODate("2026-11-16T14:05:00Z") }]
  },
  {
    id_alerta: 2, id_leitura: 2, id_ponto: 2,
    classificacao: "ALTO", probabilidade: 85.00,
    mensagem_explicativa: "Volume elevado de chuva e aumento do nivel da agua.",
    status: "ATIVO", data_geracao: ISODate("2026-11-16T14:35:00Z"),
    auditoria: [{ operacao: "INSERT", status_anterior: null,
      status_novo: "ATIVO", data_operacao: ISODate("2026-11-16T14:35:00Z") }]
  },
  {
    id_alerta: 3, id_leitura: 4, id_ponto: 4,
    classificacao: "CRITICO", probabilidade: 97.00,
    mensagem_explicativa: "Nivel e volume de chuva em faixa critica.",
    status: "ATIVO", data_geracao: ISODate("2026-11-16T15:35:00Z"),
    auditoria: [{ operacao: "INSERT", status_anterior: null,
      status_novo: "ATIVO", data_operacao: ISODate("2026-11-16T15:35:00Z") }]
  },
  {
    id_alerta: 4, id_leitura: 3, id_ponto: 3,
    classificacao: "MODERADO", probabilidade: 60.00,
    mensagem_explicativa: "Chuva moderada registrada; nivel da agua indisponivel.",
    status: "RESOLVIDO", data_geracao: ISODate("2026-11-16T15:10:00Z"),
    data_resolucao: ISODate("2026-11-16T17:00:00Z"),
    auditoria: [
      { operacao: "INSERT", status_anterior: null, status_novo: "ATIVO",
        data_operacao: ISODate("2026-11-16T15:10:00Z") },
      { operacao: "UPDATE", status_anterior: "ATIVO", status_novo: "RESOLVIDO",
        data_operacao: ISODate("2026-11-16T17:00:00Z") }
    ]
  },
  {
    id_alerta: 5, id_leitura: 5, id_ponto: 5,
    classificacao: "BAIXO", probabilidade: 10.00,
    mensagem_explicativa: "Indicadores dentro da faixa de baixo risco.",
    status: "RESOLVIDO", data_geracao: ISODate("2026-11-16T16:05:00Z"),
    data_resolucao: ISODate("2026-11-16T16:30:00Z"),
    auditoria: [{ operacao: "INSERT", status_anterior: null,
      status_novo: "RESOLVIDO", data_operacao: ISODate("2026-11-16T16:30:00Z") }]
  }
]);

print(`Documentos em monitoramentos: ${citizenDb.monitoramentos.countDocuments()}`);
print(`Documentos em alertas: ${citizenDb.alertas.countDocuments()}`);
