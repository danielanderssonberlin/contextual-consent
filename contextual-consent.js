function removeOverlays() {
    document.querySelectorAll('.cookie-overlay').forEach(function (overlay) {
        overlay.remove();
    });
}
if (typeof OnetrustActiveGroups === "undefined" || !OnetrustActiveGroups.includes(",4,")) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initYoutubeBlocking);
    } else {
        initYoutubeBlocking();
    }
}
function initYoutubeBlocking() {
    // Abbrechen, wenn Consent vorhanden
    if (typeof OnetrustActiveGroups !== "undefined" && OnetrustActiveGroups.includes(",4,")) {
        removeOverlays();
        return;
    }
    document.querySelectorAll("iframe.optanon-category-4").forEach(function(iframe) {
        var wrapper = document.createElement("div");
        wrapper.className = "cookie-iframe-wrapper";
        var overlay = document.createElement("div");
        overlay.className = "cookie-overlay";
        overlay.innerHTML = `
            <p>Dieses Video wird von YouTube eingebunden und verwendet Marketing-Cookies, um personalisierte Inhalte und Werbung anzuzeigen.<br>
            Bitte akzeptieren Sie Marketing-Cookies, um das Video direkt auf dieser Seite ansehen zu können.</p>
            <button type="button">Marketing-Cookies akzeptieren</button>
        `;
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
        wrapper.appendChild(overlay);
        overlay.querySelector("button").addEventListener("click", function() {
            // Consent setzen
            OneTrust.UpdateConsent("Category", "4:1");
            // Nur dann src setzen, wenn Lazy Load benutzt wird
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
            }
            removeOverlays();
        });
    });
}
