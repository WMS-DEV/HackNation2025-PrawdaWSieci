// Listen for messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showSuspiciousNotification") {
        showSuspiciousNotification(request.domain);
    }
});

function showSuspiciousNotification(domain) {
    // Remove existing notification if present
    const existing = document.getElementById("ssl-test-warning");
    if (existing) existing.remove();

    // Create notification container
    const container = document.createElement("div");
    container.id = "ssl-test-warning";

    // Add warning text
    container.textContent = `Warning: This site ("${domain}") is suspiciously similar to gov.pl`;

    // Add dismiss button
    const btn = document.createElement("button");
    btn.textContent = "Dismiss";
    btn.onclick = () => container.remove();

    container.appendChild(btn);
    document.body.appendChild(container);
}
