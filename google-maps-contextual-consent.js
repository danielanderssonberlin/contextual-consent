function initMap() {
    const container = document.getElementById('map-container');
    if (!container) return;

    // Overlay entfernen, wenn Map geladen
    const overlay = document.querySelector('#map-container .cookie-overlay');
    if (overlay) overlay.remove();
}

// Contextual Consent Check
function checkConsentAndLoadMap() {
    const container = document.getElementById('map-container');
    if (!container) return;

    const hasConsent = typeof OnetrustActiveGroups !== 'undefined' && OnetrustActiveGroups.includes(",4,");

    if (hasConsent) {
        return;
    } else {
        // Overlay erzeugen, falls noch nicht vorhanden
        if (!container.querySelector('.cookie-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'cookie-overlay';
            overlay.innerHTML = `
                <p>Diese Karte wird von Google Maps eingebunden und verwendet Marketing-Cookies, um personalisierte Inhalte und Werbung anzuzeigen.<br>
                Bitte akzeptieren Sie Marketing-Cookies, um die Karte direkt auf dieser Seite ansehen zu können.</p>
                <button type="button">Marketing-Cookies akzeptieren</button>
            `;
            container.appendChild(overlay);

            // Button-Handler
            overlay.querySelector('button').addEventListener('click', () => {
                OneTrust.UpdateConsent("Category", "4:1");
                overlay.remove();
            });
        }
    }
}

// Init nach DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    checkConsentAndLoadMap();
    // Consent nachträglich akzeptiert → Map laden
    window.addEventListener('OneTrustGroupsUpdated', checkConsentAndLoadMap);
});
