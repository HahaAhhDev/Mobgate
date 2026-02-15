// Mobgate Bookmarklet Launcher
// This script loads the main GUI.js from jsDelivr CDN
(function() {
    // Prevent multiple instances
    if (window.mobgateLoading) {
        console.warn('Mobgate is already loading...');
        return;
    }
    window.mobgateLoading = true;

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/HahaAhhDev/Mobgate@main/GUI.js?ts=' + Date.now();

    script.onerror = function() {
        window.mobgateLoading = false;
        alert('❌ Failed to load Mobgate. Check your connection and try again.');
        console.error('Mobgate failed to load from CDN');
    };

    script.onload = function() {
        console.log('✅ Mobgate loaded successfully');
        window.mobgateLoading = false;
    };

    document.head.appendChild(script);
})();
