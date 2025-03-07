const magic8Ball = document.querySelector('.magic-8-ball');
const answerElement = document.querySelector('.answer');
const questionInput = document.querySelector('#question-input');
const askButton = document.querySelector('#ask-button');
const loadingMessage = document.querySelector('.loading-message');

const answers = [
  'Alex could solve that problem',
  'Alex is the right choice',
  'No doubt Alex will succeed',
  'Definitely hire Alex',
  'You can rely on Alex',
  'As I see it, Alex is the best',
  'Most likely, Alex will excel',
  'Outlook good with Alex',
  'Yes, Alex is a great fit',
  'Signs point to hiring Alex',
  'Consider Alex for the job',
  'Alex will ask the right questions',
  'Better not wait, hire Alex now',
  'Alex cannot be underestimated',
  'Alex will concentrate and deliver',
  'Don\'t count on anyone but Alex',
  'My reply is Alex',
  'My sources say Alex is the one',
  'Outlook not so good without Alex',
  'Very doubtful anyone is better than Alex'
];

askButton.addEventListener('click', () => {
  const question = questionInput.value.trim();
  if (question === '') {
    alert('Please ask a question!');
    return;
  }
  const answer = answers[Math.floor(Math.random() * answers.length)];
  answerElement.textContent = answer;
  loadingMessage.textContent = 'Loading...';
  setTimeout(() => {
    loadingMessage.textContent = '';
  }, 2000);
});