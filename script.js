//CARDS


const filterButtons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {
  button.addEventListener("click", e => {
    filterCards(e.currentTarget);
  });
});

function filterCards(button) {
  const tag = button.dataset.tag;
  console.log("filterCards called with tag:", tag);

  filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));

  // Filter cards
  cards.forEach(card => {
    let cardTags = card.dataset.tags.split(" ");
      
    card.classList.toggle("hidden", tag !== "all" && !cardTags.includes(tag));
  });
}


//CONTACT FORM

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Create a data object
  const data = { name, email, message };

  // Send the data to your server-side script using fetch or similar
  fetch('/send-email', { // Replace '/send-email' with your server endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    if (data.success) {
      alert('Email sent successfully!');
      // Optionally reset the form
      document.getElementById('contact-form').reset();
    } else {
      alert('Error sending email: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  });
});
