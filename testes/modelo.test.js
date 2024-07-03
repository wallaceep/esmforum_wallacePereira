const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_pergunta('? + ? = 4');
  modelo.cadastrar_resposta(0,'2 + 2');
  modelo.cadastrar_resposta(0,'1 + 3');
  modelo.cadastrar_resposta(0,'4 + 0');
  const respostas = modelo.get_respostas(0); 
  expect(respostas.length).toBe(3);
  expect(respostas[0].texto).toBe('2 + 2');
  expect(respostas[1].texto).toBe('1 + 3');
  expect(respostas[2].texto).toBe('4 + 0');
})

test('Testando o número de respostas', () => {
  modelo.cadastrar_pergunta('12 / 4 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  modelo.cadastrar_resposta(0,'3');
  modelo.cadastrar_resposta(0,'6 / 2');
  modelo.cadastrar_resposta(1,'4');
  const num_respostas = modelo.get_num_respostas(0); 
  expect(num_respostas).toBe(2);
});

test('Testando se pergunta foi cadastrada', () => {
 const id = modelo.cadastrar_pergunta('? + ? = 4');
 modelo.cadastrar_resposta(0,'2 + 2');
 modelo.cadastrar_resposta(0,'1 + 3');
 modelo.cadastrar_resposta(0,'4 + 0');
 const pergunta = modelo.get_pergunta(id);  
 expect(pergunta.texto).toBe('? + ? = 4');
})