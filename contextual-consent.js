function removeOverlays() {
    document.querySelectorAll('.cookie-overlay').forEach(function (overlay) {
        overlay.remove();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initYoutubeBlocking);
} else {
    initYoutubeBlocking();
}

function initYoutubeBlocking() {
    const hasMarketingConsent = typeof OnetrustActiveGroups !== 'undefined' && OnetrustActiveGroups.includes(',4,');
    if (hasMarketingConsent) {
        removeOverlays();
        return;
    }

    const blockedIframes = document.querySelectorAll("iframe.optanon-category-4");

    blockedIframes.forEach(function (iframe) {
        if (iframe.dataset.src) {
            // Wrapper erstellen
            const wrapper = document.createElement("div");
            wrapper.className = "cookie-iframe-wrapper";

            const overlay = document.createElement("div");
            overlay.className = "cookie-overlay";
            overlay.innerHTML = `
  <p>Dieses Video wird von YouTube eingebunden und verwendet Marketing-Cookies, um personalisierte Inhalte und Werbung anzuzeigen.<br>
    Bitte akzeptieren Sie Marketing-Cookies, um das Video direkt auf dieser Seite ansehen zu können..</p>
  <button type="button">Marketing-Cookies akzeptieren</button>
  `;

            iframe.parentNode.insertBefore(wrapper, iframe);
            wrapper.appendChild(iframe);
            wrapper.appendChild(overlay);

            // Button-Handler
            overlay.querySelector("button").addEventListener("click", function () {
                OneTrust.UpdateConsent("Category", "4:1")
                document.querySelectorAll("iframe.optanon-category-4[data-src]").forEach(function (iframe) {
                    iframe.src = iframe.dataset.src;
                });
                removeOverlays();
            });
        }
    });
}


