const assert = require('assert');
const db = require('../config/dbConfig');


describe('Testes da tabela usuarios', () => {
    it('Deve retornar todos os usuários', (done) => {
        db.query('SELECT * FROM usuarios', (error, results) => {
            // Verifica se não houve erro
            assert.strictEqual(error, null); 

            // Lança um erro caso a tabela esteja vazia
            if (results.length === 0) {
                throw new Error('Nenhum usuário encontrado na tabela');
            }


            // Verifica que o resultado é um array e possui pelo menos um elemento
            assert.ok(Array.isArray(results));
            assert.ok(results.length > 0, 'A tabela deve conter pelo menos um usuário');


            done();
        });
    });
});
