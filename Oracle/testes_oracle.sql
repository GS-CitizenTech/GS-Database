-- Testes Oracle - Database Challenge / CitizenTech
-- Pre-requisito: executar Oracle/banco02.sql antes deste arquivo.
SET SERVEROUTPUT ON
SET VERIFY OFF
WHENEVER SQLERROR EXIT SQL.SQLCODE ROLLBACK

-- teste 1:
-- Verifica a classificacao de risco.
-- Valores elevados devem retornar CRITICO.
BEGIN

    DBMS_OUTPUT.PUT_LINE(
        PKG_ALERTAS.FN_CLASSIFICAR_RISCO(60, 45)
    );

END;
/


-- teste 2:
-- Verifica a validacao de uma leitura.
-- Valores positivos devem retornar VALIDA.
BEGIN

    DBMS_OUTPUT.PUT_LINE(
        PKG_MONITORAMENTO.FN_VALIDAR_LEITURA(20, 15, 5)
    );

END;
/

-- teste 3:
-- Registra uma leitura valida para o ponto 1.
BEGIN

    PKG_MONITORAMENTO.PR_REGISTRAR_LEITURA(
        1, 25, 15, 5, 'TESTE_ENTREGA'
    );

END;
/


-- teste 4:
-- Tenta registrar uma leitura invalida.
-- O valor negativo deve impedir a insercao.
BEGIN

    PKG_MONITORAMENTO.PR_REGISTRAR_LEITURA(
        1, -10, 15, 5, 'TESTE_INVALIDO'
    );

END;
/


-- Confere as leituras cadastradas.
SELECT * FROM LEITURA_ENCHENTE;

-- teste 5:
-- Gera um alerta para a leitura 3.
-- A leitura possui chuva de 22 mm e deve ser classificada
-- como MODERADO.
BEGIN

    PKG_ALERTAS.PR_GERAR_ALERTA(3);

END;
/
-- teste 6:
-- Chama novamente o procedimento para a mesma leitura.
-- Nao deve gerar outro alerta, pois ja existe um.
BEGIN

    PKG_ALERTAS.PR_GERAR_ALERTA(3);

END;
/
-- Confere os alertas gerados.
SELECT * FROM ALERTA;

-- Confere se existe apenas um alerta para a leitura 3.
SELECT COUNT(*) AS QUANTIDADE_ALERTAS
FROM ALERTA
WHERE ID_LEITURA = 3;

-- teste 7:
-- Confere os registros de auditoria.
-- Os INSERTs dos alertas devem ter sido registrados
-- automaticamente pelo trigger.
SELECT * FROM AUDITORIA_ALERTA;


-- teste 8:
-- Altera o status do primeiro alerta.
-- O trigger de UPDATE registra o status anterior e o novo.
UPDATE ALERTA
SET STATUS = 'RESOLVIDO',
    DATA_RESOLUCAO = CURRENT_TIMESTAMP
WHERE ID_ALERTA = 1;


-- Confere o historico de operacoes do primeiro alerta.
SELECT *
FROM AUDITORIA_ALERTA
WHERE ID_ALERTA = 1;

--Marcar notificacao como lida
UPDATE NOTIFICACAO
SET LIDA = 'S',
    DATA_LEITURA = CURRENT_TIMESTAMP
WHERE ID_NOTIFICACAO = 1;

--Visualiza Usuario
SELECT * FROM USUARIO;

--Visualiza notificacao
SELECT * FROM NOTIFICACAO;

-- Visualiza os pontos cadastrados.
SELECT * FROM PONTO_MONITORAMENTO;

-- Visualiza as leituras registradas.
SELECT * FROM LEITURA_ENCHENTE;

-- Visualiza os alertas existentes.
SELECT * FROM ALERTA;

-- Visualiza o historico de auditoria.
SELECT * FROM AUDITORIA_ALERTA;

-- Confirma as insercoes e alteracoes realizadas.
COMMIT;


-- BLOCO PL/SQL 1: cursor FOR LOOP + decisao.
-- Percorre as leituras e classifica o risco com a funcao do pacote.
DECLARE
    CURSOR c_leituras IS
        SELECT ID_LEITURA, CHUVA_MM, NIVEL_AGUA_CM
        FROM LEITURA_ENCHENTE
        ORDER BY ID_LEITURA;
    v_risco VARCHAR2(20);
BEGIN
    FOR r IN c_leituras LOOP
        v_risco := PKG_ALERTAS.FN_CLASSIFICAR_RISCO(
            r.CHUVA_MM, r.NIVEL_AGUA_CM
        );

        IF v_risco IN ('ALTO', 'CRITICO') THEN
            DBMS_OUTPUT.PUT_LINE(
                'ATENCAO - leitura ' || r.ID_LEITURA ||
                ' apresenta risco ' || v_risco
            );
        ELSE
            DBMS_OUTPUT.PUT_LINE(
                'Leitura ' || r.ID_LEITURA ||
                ' classificada como ' || v_risco
            );
        END IF;
    END LOOP;
END;
/

-- BLOCO PL/SQL 2: repeticao LOOP + decisao.
-- Gera alertas para leituras existentes sem duplicar registros.
DECLARE
    v_id_leitura NUMBER := 1;
    v_total NUMBER;
BEGIN
    LOOP
        EXIT WHEN v_id_leitura > 3;

        SELECT COUNT(*)
          INTO v_total
          FROM LEITURA_ENCHENTE
         WHERE ID_LEITURA = v_id_leitura;

        IF v_total > 0 THEN
            PKG_ALERTAS.PR_GERAR_ALERTA(v_id_leitura);
            DBMS_OUTPUT.PUT_LINE(
                'Processamento concluido para leitura ' || v_id_leitura
            );
        ELSE
            DBMS_OUTPUT.PUT_LINE(
                'Leitura ' || v_id_leitura || ' nao encontrada'
            );
        END IF;

        v_id_leitura := v_id_leitura + 1;
    END LOOP;
END;
/


-- Conferencia final dos objetos e resultados.
SELECT * FROM PONTO_MONITORAMENTO ORDER BY ID_PONTO;
SELECT * FROM LEITURA_ENCHENTE ORDER BY ID_LEITURA;
SELECT * FROM ALERTA ORDER BY ID_ALERTA;
SELECT * FROM AUDITORIA_ALERTA ORDER BY ID_AUDITORIA;
SELECT * FROM NOTIFICACAO ORDER BY ID_NOTIFICACAO;

COMMIT;
