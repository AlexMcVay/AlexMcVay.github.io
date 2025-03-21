"use strict";

/**
 * Resize an iframe to fit its contents.
 *
 * The iframe is resized to the height of its content. This function should be
 * called whenever the iframe's content changes.
 *
 * @param {HTMLIFrameElement} iframe The iframe to be resized.
 */
function resizeIframe(iframe) {
  iframe.style.height = "auto"; // Reset height to allow shrinking

  var newHeight = 900;
  iframe.style.height = newHeight + "px"; // Set new height
} // Wait for the DOM to fully load


document.addEventListener("DOMContentLoaded", function () {
  var iframe = document.getElementById("timelineIframe");

  if (iframe) {
    iframe.addEventListener("load", function () {
      try {
        resizeIframe(iframe); // Set up MutationObserver inside the iframe

        var observer = new MutationObserver(function () {
          return resizeIframe(iframe);
        });
        observer.observe(iframe.contentWindow.document.body, {
          childList: true,
          // Observe direct children
          subtree: true,
          // Observe all descendants
          attributes: true // Observe attribute changes

        }); // Resize on window resize (for good measure)

        window.addEventListener("resize", function () {
          return resizeIframe(iframe);
        });
      } catch (error) {
        console.warn("Cross-origin iframe detected. Resize observer not applied.");
      }
    });
  }
  /**
  * Send an email to the portfolio owner with the given name, email, and message.
  */


  function sendEmail() {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    var subject = "New message from " + name;
    var mailtoLink = "mailto:alya.mcvay@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
    window.location.href = mailtoLink;
  } // Attach event listeners to filter buttons


  var filterButtons = document.querySelectorAll(".filter-buttons button");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterCards(this.getAttribute("data-tag"), this);
    });
  });
});
/**
* Filters and displays cards based on the specified tag.
*
* @param {string} tag - The tag used to filter cards. If 'all', all cards are displayed.
* @param {HTMLElement} button - The button element that was clicked.
*/

function filterCards(tag, button) {
  console.log("filterCards called with tag:", tag);
  var cards = document.querySelectorAll(".card");
  var buttons = document.querySelectorAll(".filter-buttons button"); // Remove "active" class from all buttons

  buttons.forEach(function (btn) {
    return btn.classList.remove("active");
  }); // Add "active" class to the clicked button

  button.classList.add("active"); // Filter cards

  cards.forEach(function (card) {
    var cardTags = card.getAttribute("data-tags").split(",");

    if (tag === "all" || cardTags.includes(tag)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

var wordsToType = document.querySelector("span[words]").getAttribute("words").split(','),
    typer = document.querySelector("span[words]"),
    typingSpeed = parseInt(typer.getAttribute('typing-speed')) || 70,
    typingDelay = parseInt(typer.getAttribute('typing-delay')) || 700;
var currentWordIndex = 0,
    currentCharacterIndex = 0;

function type() {
  var wordToType = wordsToType[currentWordIndex % wordsToType.length];

  if (currentCharacterIndex < wordToType.length) {
    typer.innerHTML += wordToType[currentCharacterIndex++];
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, typingDelay);
  }
}

function erase() {
  var wordToType = wordsToType[currentWordIndex % wordsToType.length];

  if (currentCharacterIndex > 0) {
    typer.innerHTML = wordToType.substr(0, --currentCharacterIndex - 1);
    setTimeout(erase, typingSpeed);
  } else {
    currentWordIndex++;
    setTimeout(type, typingDelay);
  }
}

window.onload = function () {
  type();
};