chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showSuspiciousNotification") {
        showSuspiciousNotification(request.domain);
    }
});

function showSuspiciousNotification(domain) {
    const existing = document.getElementById("ssl-test-warning");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.id = "ssl-test-warning";

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

    const stepsTitle = document.createElement("p");
    stepsTitle.textContent = "Co musisz zrobić:";

    const stepsList = document.createElement("ol");
    const li1 = document.createElement("li");
    li1.textContent = "Nie wprowadzaj żadnych danych (login, hasło, PESEL, dane karty).";
    const li2 = document.createElement("li");
    li2.textContent = "Natychmiast zamknij tę stronę.";
    const li3 = document.createElement("li");
    li3.textContent = "Upewnij się, że adres oficjalnej strony kończy się na .gov.pl.";
    stepsList.append(li1, li2, li3);

    const reportP = document.createElement("p");
    reportP.classList = "grey"
    reportP.append(document.createTextNode("Prosimy o zgłoszenie domey na "));
    const certLink = document.createElement("a");
    certLink.href = "https://incydent.cert.pl/domena";
    certLink.target = "_blank";
    certLink.rel = "noopener";
    certLink.textContent = "oficjalnej witrynie CERT dotyczącej oszustw, badź w mObywatelu.";
    reportP.appendChild(certLink);

    const messageLine = document.createElement("p");
    messageLine.append(heading, siteLabel, siteDomain, description, phisingLink, emblemIcon, stepsTitle, stepsList, reportP);

    const btn = document.createElement("button");
    btn.textContent = "OK";
    btn.onclick = () => container.remove();

    container.appendChild(messageLine);
    container.appendChild(btn);
    document.body.appendChild(container);
}
