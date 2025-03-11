

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

 function sendEmail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var subject = "New message from " + name;
  var mailtoLink = "mailto:alya.mcvay@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
  window.location.href = mailtoLink;
}
