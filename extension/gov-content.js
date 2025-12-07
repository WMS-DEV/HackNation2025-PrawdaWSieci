const BACKEND_URL = "localhost";

// ============================================================================
// DOM Elements Setup
// ============================================================================

const floatBtn = document.createElement("button");
floatBtn.id = "qr-certificate-btn";
floatBtn.textContent = "Zweryfikuj witrynę";
const qrIcon = document.createElement("img");
qrIcon.src = chrome.runtime.getURL('qrcode.svg');
floatBtn.prepend(qrIcon);
document.body.appendChild(floatBtn);

const modal = document.createElement("div");
modal.id = "qr-certificate-modal";
modal.classList.add("qr-hidden");

const qrContent = document.createElement("div");
qrContent.className = "qr-content";

const closeBtn = document.createElement("span");
closeBtn.id = "qr-close";
closeBtn.textContent = "×";
qrContent.appendChild(closeBtn);

const elements = {
    title: createElement("h1", "Kod QR do weryfikacji"),
    description: createElement("p", "Zeskanuj kod w swojej aplikacji mObywatel."),
    loadingDiv: createElementWithId("div", "qrcode-loading"),
    displayDiv: createElementWithId("div", "qrcode-display")
};

elements.loadingDiv.appendChild(createElementWithClass("div", "qr-spinner"));

Object.values(elements).forEach(el => qrContent.appendChild(el));
modal.appendChild(qrContent);
document.body.appendChild(modal);

// ============================================================================
// State Management
// ============================================================================

let currentRequestToken = 0;

function createElement(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text;
    return el;
}

function createElementWithId(tag, id) {
    const el = document.createElement(tag);
    el.id = id;
    return el;
}

function createElementWithClass(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
}

// =========================================================================
// Modal Management
// ============================================================================

const showModal = () => {
    modal.classList.add("visible");
};

const hideModal = () => {
    modal.classList.remove("visible");
    qrContent.addEventListener("transitionend", function onTransitionEnd(e) {
        if (e.propertyName !== "opacity") return;
        clearQRDisplay();
        qrContent.removeEventListener("transitionend", onTransitionEnd);
    }, { once: true });
};

function clearQRDisplay() {
    document.getElementById("qrcode-loading").classList.remove("loading");
    document.getElementById("qrcode-display").innerHTML = "";
}

function displayQRCode(text) {
    clearQRDisplay();
    const qrContainer = document.getElementById("qrcode-display");
    new QRCode(qrContainer, { text, width: 128, height: 128 });
    modal.classList.remove("qr-hidden");
}

function displayError(message) {
    clearQRDisplay();
    const qrContainer = document.getElementById("qrcode-display");
    const errorDiv = document.createElement("div");
    errorDiv.className = "qr-error";
    errorDiv.textContent = message;
    qrContainer.appendChild(errorDiv);
    modal.classList.remove("qr-hidden");
}

// ============================================================================
// API Communication
// ============================================================================

floatBtn.addEventListener("click", async () => {
    try {
        const requestToken = ++currentRequestToken;
        document.getElementById("qrcode-loading").classList.add("loading");
        showModal();

        const domainIp = await chrome.runtime.sendMessage({ action: "getServerIp" });
        console.log(domainIp);
        displayQRCode("solvro better")

        // const response = await fetch(`${BACKEND_URL}/api/v1/validation`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         url: window.location.hostname,
        //         serverIp
        //     })
        // });

        // if (!response.ok) {
        //     const errorData = await response.json().catch(() => ({}));
        //     throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        // }

        // if (requestToken !== currentRequestToken) return;

        // const data = await response.json();
        // displayQRCode(data.validationId);
    } catch (error) {
        displayError("Nie udało się połączyć z serwerem.");
    }
});

// ============================================================================
// Event Listeners
// ============================================================================

document.getElementById("qr-close").addEventListener("click", () => {
    currentRequestToken++;
    hideModal();
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        currentRequestToken++;
        hideModal();
    }
});