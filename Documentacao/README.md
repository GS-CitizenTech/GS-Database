# Database Challenge — CitizenTech: monitoramento de enchentes

## Descrição

Este projeto demonstra o uso de Oracle com PL/SQL e a representação de parte
dos mesmos dados em MongoDB para uma solução CitizenTech de monitoramento de
enchentes. Pontos de monitoramento recebem leituras de chuva e nível da água;
regras de negócio classificam o risco e geram alertas que podem ser auditados.

## Estrutura

```text
Database-Challenge/
├── Oracle/
│   ├── banco02.sql
│   └── testes_oracle.sql
├── MongoDB/
│   ├── database.js
│   ├── collections.js
│   ├── dados_teste.js
│   └── relatorios.js
├── Documentacao/
│   ├── README.md
│   ├── mapeamento_oracle_mongodb.md
│   └── evidencias/
└── identificacao.txt
```

## Requisitos

- Oracle Database com suporte a PL/SQL e SQL Developer ou SQL*Plus.
- MongoDB Server e `mongosh`.
- Acesso aos dois bancos para executar e capturar as evidências.

## Execução Oracle

1. Abra `Oracle/banco02.sql` no Oracle SQL Developer.
2. Execute como script (F5 / Run Script).
3. Confira a criação das seis tabelas, pacotes e gatilhos.
4. Execute `Oracle/testes_oracle.sql` como script.
5. Confira as mensagens do `DBMS_OUTPUT` e os resultados dos SELECTs.

O script de criação remove as tabelas anteriores, quando existirem, para
recriar o ambiente de demonstração. Não o execute em uma base com dados
importantes que precisem ser preservados.

## Execução MongoDB

No terminal, a partir da raiz do projeto, execute os arquivos na ordem:

```bash
mongosh < MongoDB/database.js
mongosh < MongoDB/collections.js
mongosh < MongoDB/dados_teste.js
mongosh < MongoDB/relatorios.js
```

Também é possível abrir `mongosh` e executar o conteúdo de cada arquivo na
mesma ordem. `dados_teste.js` limpa as duas collections antes da carga para
permitir repetir a demonstração sem duplicar documentos.

A carga MongoDB insere cinco documentos em `monitoramentos` e cinco em
`alertas`, totalizando dez documentos principais. Leituras e auditorias
aparecem como subdocumentos incorporados.

## Regras de negócio Oracle

- `PKG_ALERTAS.FN_CLASSIFICAR_RISCO`: classifica o risco com base em chuva e
  nível de água.
- `PKG_ALERTAS.PR_GERAR_ALERTA`: cria alerta quando a leitura exige atenção,
  evitando duplicidade por leitura.
- `PKG_MONITORAMENTO.FN_VALIDAR_LEITURA`: valida os valores recebidos.
- `PKG_MONITORAMENTO.PR_REGISTRAR_LEITURA`: registra somente leituras válidas.
- `TRG_AUDITAR_ALERTA_INSERT` e `TRG_AUDITAR_ALERTA_UPDATE`: registram
  inserção e alteração de status na tabela `AUDITORIA_ALERTA`.

## Relatórios MongoDB

1. Pontos de monitoramento e suas leituras (`find`).
2. Alertas classificados como alto ou crítico (`find`).
3. Quantidade e probabilidade média de alertas por classificação (`aggregate`).

O arquivo `Documentacao/mapeamento_oracle_mongodb.md` explica as estruturas
correspondentes, os dados incorporados e as referências lógicas.

## Evidências

Salve na pasta `Documentacao/evidencias/` capturas reais de:
- execução dos scripts Oracle sem erros;
- objetos Oracle e saída dos testes PL/SQL;
- criação das collections e contagem dos documentos MongoDB;
- saída dos três relatórios MongoDB;
- comparação dos resultados Oracle e MongoDB.

As evidências não são simuladas nem incluídas antecipadamente.

## Identificação e entrega

Preencha `identificacao.txt` com os nomes, RMs, turma e demais dados
solicitados pelo Portal do Aluno antes de compactar e enviar a entrega.

## Observação acadêmica

Os dados são demonstrativos e não representam medições operacionais nem
previsões oficiais de enchentes. A classificação apresentada é uma regra
didática de negócio, não um serviço público de alerta.
