// Relatorios MongoDB - executar apos database.js, collections.js e dados_teste.js
const citizenDb = db.getSiblingDB("citizentech_enchentes");

print("\\nRELATORIO 1 - Pontos de monitoramento e leituras");
citizenDb.monitoramentos.find(
  {},
  { _id: 0, id_ponto: 1, codigo: 1, nome: 1, bairro: 1, leituras: 1 }
).sort({ id_ponto: 1 }).forEach(printjson);

print("\\nRELATORIO 2 - Alertas de risco alto ou critico");
citizenDb.alertas.find(
  { classificacao: { $in: ["ALTO", "CRITICO"] } },
  { _id: 0, id_alerta: 1, id_ponto: 1, classificacao: 1,
    probabilidade: 1, status: 1, mensagem_explicativa: 1 }
).sort({ probabilidade: -1 }).forEach(printjson);

print("\\nRELATORIO 3 - Agregacao: quantidade de alertas por classificacao");
citizenDb.alertas.aggregate([
  {
    $group: {
      _id: "$classificacao",
      quantidade: { $sum: 1 },
      probabilidade_media: { $avg: "$probabilidade" }
    }
  },
  { $sort: { _id: 1 } },
  {
    $project: {
      _id: 0,
      classificacao: "$_id",
      quantidade: 1,
      probabilidade_media: { $round: ["$probabilidade_media", 2] }
    }
  }
]).forEach(printjson);
