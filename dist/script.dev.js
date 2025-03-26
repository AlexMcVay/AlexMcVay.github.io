"use strict";

//CARDS
var filterButtons = document.querySelectorAll(".filter-buttons button");
var cards = document.querySelectorAll(".card");
filterButtons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    filterCards(e.currentTarget);
  });
});

function filterCards(button) {
  var tag = button.dataset.tag;
  console.log("filterCards called with tag:", tag);
  filterButtons.forEach(function (btn) {
    return btn.classList.toggle("active", btn === button);
  }); // Filter cards

  cards.forEach(function (card) {
    var cardTags = card.dataset.tags.split(" ");
    card.classList.toggle("hidden", tag !== "all" && !cardTags.includes(tag));
  });
} //CONTACT FORM


document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value; // Create a data object

  var data = {
    name: name,
    email: email,
    message: message
  }; // Send the data to your server-side script using fetch or similar

  fetch('/send-email', {
    // Replace '/send-email' with your server endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // Handle the response from the server
    if (data.success) {
      alert('Email sent successfully!'); // Optionally reset the form

      document.getElementById('contact-form').reset();
    } else {
      alert('Error sending email: ' + data.message);
    }
  })["catch"](function (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  });
});