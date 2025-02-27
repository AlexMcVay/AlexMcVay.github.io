const magic8Ball = document.querySelector('.magic-8-ball');
const answerElement = document.querySelector('.answer');
const questionInput = document.querySelector('#question-input');
const askButton = document.querySelector('#ask-button');
const loadingMessage = document.querySelector('.loading-message');

const answers = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  'Don\'t count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
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