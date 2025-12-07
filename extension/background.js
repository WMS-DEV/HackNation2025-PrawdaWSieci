const SERVICE_URL = "govguard-internal.wmsdev.pl";
const TARGET_DOMAIN = "gov.pl"

let serverIpCache = {};

const checkDomain = (domain, tabId) => {
    const segments = domain.split(".").filter(Boolean);
    const trimmedDomain = segments.slice(-2).join(".") || domain;
    const distance = levenshteinFullMatrix(trimmedDomain, TARGET_DOMAIN);

    if (distance <= 3 && distance != 0) {
        console.log("error", domain, tabId);

        setTimeout(() => {

            chrome.tabs.sendMessage(tabId, {
                action: "showSuspiciousNotification",
                domain: domain
            }).catch((error) => {

                console.log("Content script not ready or unavailable:", error.message);
            });
        }, 2000)
    }

    return distance;
}

function levenshteinFullMatrix(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

    // Initialize the first row 
    // and column of the matrix
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    // Insert
                    dp[i][j - 1],
                    Math.min(
                        // Remove
                        dp[i - 1][j],
                        // Replace
                        dp[i - 1][j - 1]
                    )
                );
            }
        }
    }
    return dp[m][n];
}

chrome.webRequest.onCompleted.addListener(
    async (details) => {
        console.log(details);

        if (details.ip && details.tabId >= 0) {
            // Cache the IP for this tab
            serverIpCache[details.tabId] = details.ip;
        }
        try {
            const hostname = new URL(details.url).hostname;
            checkDomain(hostname, details.tabId);
        } catch (_) { }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getServerIp") {
        const tabId = sender.tab?.id;
        if (tabId !== undefined) {
            const ip = serverIpCache[tabId] || "unknown";
            sendResponse(ip);
        } else {
            sendResponse("unknown");
        }
    }
});

// Clean up cache when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    delete serverIpCache[tabId];
});