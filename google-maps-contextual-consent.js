function loadGoogleMaps() {
    if (document.getElementById('map-container').dataset.loaded) return; // Doppel-Laden verhindern
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap";
    script.async = true;
    document.body.appendChild(script);
    document.getElementById('map-container').dataset.loaded = true;
}

function initMap() {
    const container = document.getElementById('map-container');
    // Overlay ausblenden, wenn geladen
    const overlay = document.getElementById('map-overlay');
    if (overlay) overlay.style.display = 'none';
    document.addEventListener('DOMContentLoaded', () => {
        checkConsentAndLoadMap();

        // Consent nachträglich akzeptiert
        window.addEventListener('OneTrustGroupsUpdated', checkConsentAndLoadMap);
    });
}

// Contextual Consent Check
function checkConsentAndLoadMap() {
    // Prüfen, ob Marketing-Consent vorhanden ist
    if (typeof OnetrustActiveGroups !== 'undefined' && OnetrustActiveGroups.includes(",4,")) {
        loadGoogleMaps();
    } else {
        // Overlay anzeigen, Map noch nicht laden
        const overlay = document.getElementById('map-overlay');
        if (overlay) overlay.style.display = 'flex';
    }
}

// Consent ändern Event abfangen (z.B. wenn User Marketing akzeptiert)
document.addEventListener('DOMContentLoaded', () => {
    checkConsentAndLoadMap();

    // Onetrust Callback, falls Consent nachträglich gegeben wird
    window.addEventListener('OneTrustGroupsUpdated', checkConsentAndLoadMap);
    const button = document.querySelector('#map-overlay button');
    if (button) {
        button.addEventListener('click', () => {
            // Marketing Consent setzen
            OneTrust.UpdateConsent("Category", "4:1");
            loadGoogleMaps();
        });
    }
});
