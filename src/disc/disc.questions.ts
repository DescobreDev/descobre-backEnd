export type DiscProfile = 'EXECUTOR' | 'COMMUNICATOR' | 'ANALYST' | 'PLANNER';

export interface DiscOption {
  label: string;
  profile: DiscProfile;
}

export interface DiscQuestion {
  id: number;
  text: string;
  options: DiscOption[];
}

export const DISC_QUESTIONS: DiscQuestion[] = [
  {
    id: 1,
    text: 'O grupo decide viajar. O que você faz primeiro?',
    options: [
      { label: 'Agito o grupo e dou ideias de passeios divertidos.', profile: 'COMMUNICATOR' },
      { label: 'Defino a data, o destino e já faço a reserva.', profile: 'EXECUTOR' },
      { label: 'Calculo os gastos de combustível, pedágio e hospedagem.', profile: 'ANALYST' },
      { label: 'Pergunto se a data fica boa e confortável para todos.', profile: 'PLANNER' },
    ],
  },
  {
    id: 2,
    text: 'O grupo não sabe onde jantar. Como você age?',
    options: [
      { label: 'Escolho o lugar na hora e digo: "Vamos nesse!".', profile: 'EXECUTOR' },
      { label: 'Sugiro o lugar mais animado e badalado do momento.', profile: 'COMMUNICATOR' },
      { label: 'Pesquiso as avaliações, preços e o cardápio na internet.', profile: 'ANALYST' },
      { label: 'Concordo com o que a maioria escolher para evitar conflito.', profile: 'PLANNER' },
    ],
  },
  {
    id: 3,
    text: 'Você comprou um aparelho novo. Ao abrir a caixa, você:',
    options: [
      { label: 'Ligo direto na tomada e vou testando os botões.', profile: 'EXECUTOR' },
      { label: 'Leio o manual de instruções antes de ligar o aparelho.', profile: 'ANALYST' },
      { label: 'Chamo as pessoas de casa para ver e testar comigo.', profile: 'COMMUNICATOR' },
      { label: 'Organizo com calma o espaço definitivo onde ele vai ficar.', profile: 'PLANNER' },
    ],
  },
  {
    id: 4,
    text: 'Você pegou um trânsito pesado inesperado. Sua reação é:',
    options: [
      { label: 'Procurar rotas alternativas mais rápidas no GPS.', profile: 'ANALYST' },
      { label: 'Ligar calmamente para avisar o atraso e esperar o fluxo.', profile: 'PLANNER' },
      { label: 'Sentir irritação imediata e tentar mudar de faixa logo.', profile: 'EXECUTOR' },
      { label: 'Ligar o rádio, mandar áudios ou se distrair com o celular.', profile: 'COMMUNICATOR' },
    ],
  },
  {
    id: 5,
    text: 'Um amigo te conta um problema pessoal sério. Você:',
    options: [
      { label: 'Ouço com atenção e empatia, sem interromper ou julgar.', profile: 'PLANNER' },
      { label: 'Dou um conselho prático e direto para resolver logo.', profile: 'EXECUTOR' },
      { label: 'Tento animar a pessoa e proponho sairmos para distrair.', profile: 'COMMUNICATOR' },
      { label: 'Ajudo a analisar friamente os fatos para entender o que deu errado.', profile: 'ANALYST' },
    ],
  },
  {
    id: 6,
    text: 'No planejamento financeiro da sua casa, você prefere:',
    options: [
      { label: 'Seguir uma planilha rígida anotando cada centavo gasto.', profile: 'ANALYST' },
      { label: 'Ter uma reserva segura na poupança e evitar qualquer risco.', profile: 'PLANNER' },
      { label: 'Gastar com experiências, jantares e momentos de lazer.', profile: 'COMMUNICATOR' },
      { label: 'Investir de forma agressiva para multiplicar o dinheiro rápido.', profile: 'EXECUTOR' },
    ],
  },
  {
    id: 7,
    text: 'Em uma discussão acalorada entre amigos, você:',
    options: [
      { label: 'Exponho minha opinião de forma firme e lidero a votação.', profile: 'EXECUTOR' },
      { label: 'Tento acalmar os ânimos e mediar a paz entre todos.', profile: 'PLANNER' },
      { label: 'Faço piadas e comentários leves para quebrar o gelo.', profile: 'COMMUNICATOR' },
      { label: 'Apresento as regras e leis para provar quem está certo.', profile: 'ANALYST' },
    ],
  },
  {
    id: 8,
    text: 'Ao organizar uma festa de aniversário, sua função é:',
    options: [
      { label: 'Convidar todo mundo e garantir que a música esteja boa.', profile: 'COMMUNICATOR' },
      { label: 'Controlar os ingredientes exatos e o horário do forno.', profile: 'ANALYST' },
      { label: 'Fechar o contrato do local e mandar o cronograma.', profile: 'EXECUTOR' },
      { label: 'Ajudar na decoração e garantir o bem-estar dos convidados.', profile: 'PLANNER' },
    ],
  },
  {
    id: 9,
    text: 'Você recebe uma crítica direta sobre algo que fez. Sua primeira reação:',
    options: [
      { label: 'Questionar os critérios técnicos e a lógica por trás da crítica.', profile: 'ANALYST' },
      { label: 'Focar imediatamente em como corrigir e fazer melhor.', profile: 'EXECUTOR' },
      { label: 'Ficar preocupado com o impacto disso na relação com a pessoa.', profile: 'PLANNER' },
      { label: 'Tentar me justificar verbalmente de forma descontraída.', profile: 'COMMUNICATOR' },
    ],
  },
  {
    id: 10,
    text: 'Quando você entra em uma loja para comprar uma roupa, você prefere:',
    options: [
      { label: 'Ser deixado livre para olhar as araras sozinho.', profile: 'ANALYST' },
      { label: 'Entrar, pegar a primeira peça que serve e ir ao caixa.', profile: 'EXECUTOR' },
      { label: 'Conversar com o vendedor, pedir opinião e provar novidades.', profile: 'COMMUNICATOR' },
      { label: 'Comprar a marca que já uso há anos e sei que funciona.', profile: 'PLANNER' },
    ],
  },
];