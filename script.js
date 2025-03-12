

/**
 * Resize an iframe to fit its contents.
 *
 * The iframe is resized to the height of its content. This function should be
 * called whenever the iframe's content changes.
 *
 * @param {HTMLIFrameElement} iframe The iframe to be resized.
 */
function resizeIframe(iframe) {
  iframe.style.height = "auto"; // Reset height to auto to allow it to shrink
  const newHeight = iframe.contentWindow.document.body.scrollHeight;
  iframe.style.height = newHeight + "px"; // Set new height
}
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById('timelineIframe');
-
-  // Add event listeners
-  iframe.addEventListener('load', () => resizeIframe(iframe)); // Resize when the iframe loads
-  window.addEventListener('resize', () => resizeIframe(iframe)); // Resize when the window is resized
+  
+  iframe.addEventListener('load', () => {
+    resizeIframe(iframe); // Initial resize when iframe loads

+    // Set up MutationObserver inside the iframe
+    const observer = new MutationObserver(() => {
+      resizeIframe(iframe); // Resize whenever content changes
+    });
+
+    // Start observing the iframe's body for changes
+    observer.observe(iframe.contentWindow.document.body, {
+      childList: true, // Observe direct children
+      subtree: true,   // Observe all descendants
+      attributes: true // Observe attribute changes
+    });
+
+    // Resize on window resize (for good measure)
+    window.addEventListener('resize', () => resizeIframe(iframe));
+  });
 });


/**
 * Send an email to the portfolio owner with the given name, email, and message.
 * @function
 */
 function sendEmail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var subject = "New message from " + name;
  var mailtoLink = "mailto:alya.mcvay@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
  window.location.href = mailtoLink;
}

/**
 * Filters and displays cards based on the specified tag.
 * 
 * @param {string} tag - The tag used to filter cards. If 'all', all cards are displayed.
 * 
 * It then iterates over the buttons to remove the "active" class from all buttons
 * and adds the "active" class to the clicked button. For each card, it checks if the 
 * card's tags include the specified tag or if the tag is "all". If true, the card is 
 * displayed by removing the "hidden" class; otherwise, the card is hidden by adding 
 * the "hidden" class.
 */


function filterCards(tag) {
  let cards = document.querySelectorAll(".card");
  let buttons = document.querySelectorAll(".filter-buttons button");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach(card => {
      let cardTags = card.getAttribute("data-tags").split(" ");
      if (tag === "all" || cardTags.includes(tag)) {
          card.classList.remove("hidden");
      } else {
          card.classList.add("hidden");
      }
  });
}
