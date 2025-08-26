// tracking injection script goes here

(function (global) {
    // Get configuration from <script> tag attributes
    const scriptTag = document.currentScript;
    const userId = scriptTag.dataset.user || "";
    const apiToken = scriptTag.dataset.apitoken || "";
    const baseUrl = scriptTag.dataset.base || "";

    //possibly switch to env variable
    const trackingServerUrl = scriptTag.dataset.endpoint || "https://kafka-producer.up.railway.app/track"; 

    const originalFetch = global.fetch;

    global.fetch = async function (resource, init) {
        const startTime = Date.now();
        const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

        // Only track requests going to the configured base URL
        if (!resource.startsWith(normalizedBaseUrl)) {
            return originalFetch(resource, init);
        }

        try {
            const response = await originalFetch(resource, init);
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            sendTrackingData(resource, init, response.status, responseTime);
            return response;
        } catch (error) {
            sendTrackingData(resource, init, "error", -1);
            throw error;
        }
    };

    function sendTrackingData(url, init, status, responseTime) {
        const trackingData = {
            userId: userId,
            apiToken: apiToken,
            apiUrl: url,
            method: (init && init.method) || "GET",
            status: status,
            responseTime: responseTime,
            timestamp: new Date().toISOString(),
        };

        originalFetch(trackingServerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trackingData),
        }).catch((err) => console.error("Tracking failed:", err));
    }
})(window);
