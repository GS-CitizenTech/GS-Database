# Mapeamento Oracle → MongoDB

## Objetivo

Representar no MongoDB parte dos dados relacionais do projeto CitizenTech de
monitoramento de enchentes, preservando identificadores para permitir a
comparação entre os registros dos dois bancos. A atividade não exige
integração automática; a transição é demonstrada por scripts e consultas.

## Correspondência entre estruturas

| Oracle | MongoDB | Estratégia |
|---|---|---|
| PONTO_MONITORAMENTO | monitoramentos | Um documento por ponto. |
| LEITURA_ENCHENTE | `leituras` dentro de monitoramentos | Documento incorporado, pois a leitura pertence ao ponto e é consultada junto dele. |
| ALERTA | alertas | Um documento por alerta, mantendo `id_leitura` e `id_ponto` como referências lógicas. |
| AUDITORIA_ALERTA | `auditoria` dentro de alertas | Histórico incorporado ao alerta para leitura conjunta do ciclo de vida. |
| USUARIO | Não replicada nesta demonstração | Dados de autenticação não são necessários aos três relatórios selecionados. |
| NOTIFICACAO | Não replicada nesta demonstração | A representação MongoDB foi limitada ao monitoramento e aos alertas. |

## Incorporado x referência

- **Documentos incorporados:** `leituras` em `monitoramentos` e `auditoria` em
  `alertas`. Esses dados possuem relação de pertencimento e são úteis junto ao
  documento principal.
- **Referências lógicas:** `id_ponto` e `id_leitura` nos documentos de `alertas`.
  Esses campos preservam a ligação com as entidades de origem sem duplicar
  todos os dados do ponto ou da leitura no alerta.

## Identificação e equivalência

Os campos `id_ponto`, `id_leitura` e `id_alerta` preservam os identificadores
usados no conjunto de dados Oracle de exemplo. A equivalência deve ser
conferida pelos valores desses campos e pelos atributos de negócio, não pelo
campo interno `_id` gerado pelo MongoDB.

## Limites da demonstração

Os documentos MongoDB são uma carga de demonstração baseada no domínio e nos
dados de exemplo do script Oracle. O conjunto MongoDB contém pontos e alertas
de exemplo adicionais para que os relatórios tenham variedade de resultados;
antes da apresentação, a equipe deve alinhar os dados se optar por executar
uma comparação estritamente linha a linha com uma carga Oracle ampliada.
