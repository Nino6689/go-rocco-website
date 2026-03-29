// Go Rocco - App Store Attribution Tracking
// Appends campaign token (ct=) to all App Store links on the page.
// The app reads this via Apple AdServices on first launch to know
// which channel (Instagram, TikTok, QR code, etc.) drove the download.
(function() {
  var params = new URLSearchParams(window.location.search);
  var source = params.get('utm_source') || '';
  var campaign = params.get('utm_campaign') || '';

  var ct = 'web-direct';
  if (source) {
    ct = 'web-' + source;
    if (campaign) ct += '-' + campaign;
  }
  ct = ct.substring(0, 40); // Apple ct max 40 chars

  var appStoreUrl = 'https://apps.apple.com/gb/app/go-rocco/id6753819069?ct=' + ct;

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="apps.apple.com/gb/app/go-rocco"]').forEach(function(link) {
      link.href = appStoreUrl;
    });
  });
})();
