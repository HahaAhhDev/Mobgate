// Mobgate Bookmarklet Launcher
// This script loads the main GUI.js from the GitHub CDN
(function() {
    // Prevent multiple instances
    if (window.mobgateLoading) {
        console.warn('Mobgate is already loading...');
        return;
    }
    window.mobgateLoading = true;

    const script = document.createElement('script');

    // Try raw.githack first (reflects latest commits quickly), then fall back to jsDelivr CDN
    const timestamp = Date.now();
    const primary = `https://raw.githack.com/HahaAhhDev/Mobgate/main/GUI.js?ts=${timestamp}`;
    const fallback = `https://cdn.jsdelivr.net/gh/HahaAhhDev/Mobgate@main/GUI.js?ts=${timestamp}`;

    let triedFallback = false;
    script.src = primary;

    script.onerror = function() {
        if (!triedFallback) {
            console.warn('Primary load failed, trying CDN fallback...');
            triedFallback = true;
            script.src = fallback;
            return;
        }
        window.mobgateLoading = false;
        alert('❌ Failed to load Mobgate. Check your connection and try again.');
        console.error('Mobgate failed to load from both primary and fallback sources');
    };

    script.onload = function() {
        console.log('✅ Mobgate loaded successfully from', triedFallback ? 'CDN fallback' : 'primary');
        window.mobgateLoading = false;
    };

    document.head.appendChild(script);
})();
