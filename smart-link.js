// Routes the main download CTA to the App Store.
// Shows a note for non-iOS visitors.
(function () {
  var iosUrl = "https://apps.apple.com/app/dele-b1-practice/id6772564355";
  var cta = document.getElementById("cta-download");
  if (cta) cta.href = iosUrl;

  // Detect non-iOS visitors and show a subtle note
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!isIOS && !(/Macintosh/.test(navigator.userAgent))) {
    var badges = document.querySelectorAll('.ios-badge-text');
    badges.forEach(function(el) {
      el.textContent = el.textContent.includes('Disponible') 
        ? 'Disponible solo en iPhone (iOS)' 
        : 'Available on iPhone only (iOS)';
    });
  }
})();
