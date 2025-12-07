const SERVICE_URL = "govguard-internal.wmsdev.pl";
const TARGET_DOMAIN = "gov.pl"

let serverIpCache = {};
const confusablesMap = {
    '0': 'o', '1': 'l', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a',
    '!': 'i', '$': 's', 'α': 'a', 'ρ': 'p', 'rn': 'm', 'vv': 'w',
    // cyrillic lookalikes common in phishing
    'а': 'a', 'с': 'c', 'е': 'e', 'о': 'o', 'р': 'p', 'х': 'x', 'у': 'y',
    'і': 'i', 'к': 'k', 'м': 'm', 'т': 't', 'в': 'b'
};

const normalizeDomain = (str) => {
    let normalized = str.toLowerCase();

    normalized = normalized.replace(/rn/g, "m").replace(/vv/g, "w");

    return normalized.split('').map(char => confusablesMap[char] || char).join('');
};

const checkDomain = (domain, tabId) => {
    const TARGET_DOMAIN = "gov.pl";

    // ignore valid *.gov.pl domain
    if (domain.endsWith(".gov.pl") || domain === "gov.pl") return 0;

    const segments = domain.split(".").filter(Boolean);
    const trimmedDomain = segments.slice(-2).join(".") || domain;

    // NORMALIZE - turn g0v.pl -> gov.pl etc
    const skeletonDomain = normalizeDomain(trimmedDomain);
    const skeletonTarget = normalizeDomain(TARGET_DOMAIN);

    // calculate Distance
    const distance = levenshteinFullMatrix(skeletonDomain, skeletonTarget);

    const THRESHOLD = 3;

    if (distance <= THRESHOLD && distance !== 0) {
        console.warn(`Suspicious Domain Detected! Input: ${domain} (Skeleton: ${skeletonDomain})`);

        setTimeout(() => {
            chrome.tabs.sendMessage(tabId, {
                action: "showSuspiciousNotification",
                domain: domain,
                reason: "Visual similarity to gov.pl"
            })
        }, 2000)
    }

    return distance;
};

function levenshteinFullMatrix(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

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
                    // insert
                    dp[i][j - 1],
                    Math.min(
                        // remove
                        dp[i - 1][j],
                        // replace
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

chrome.tabs.onRemoved.addListener((tabId) => {
    delete serverIpCache[tabId];
});