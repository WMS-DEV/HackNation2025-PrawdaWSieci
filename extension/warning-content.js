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

    // Build structured message
    const heading = document.createElement("h3");
    heading.textContent = "Uwaga! Niebezpieczeństwo!";

    const siteLabel = document.createElement("span");
    siteLabel.textContent = "Witryna ";

    const siteDomain = document.createElement("span");
    siteDomain.textContent = `"${domain}"`;

    const description = document.createElement("span");
    description.textContent = " została oflagowana przez twoją oficjalną wtyczkę sprawdzającą jako podejrzana o ";

    const phisingLink = document.createElement("a");
    phisingLink.href = "https://www.gov.pl/web/baza-wiedzy/czym-jest-phishing-i-jak-nie-dac-sie-nabrac-na-podejrzane-widomosci-e-mail-oraz-sms-y"
    phisingLink.target = "_blank";
    phisingLink.textContent = "phishing."

    const emblemIcon = document.createElement("img");
    emblemIcon.src = chrome.runtime.getURL('emblem.svg');

    const messageLine = document.createElement("p");
    messageLine.append(heading, siteLabel, siteDomain, description, phisingLink, emblemIcon);

    // Add dismiss button
    const btn = document.createElement("button");
    btn.textContent = "Przyjąłem";
    btn.onclick = () => container.remove();

    // Append message and button
    container.appendChild(messageLine);
    container.appendChild(btn);
    document.body.appendChild(container);
}
