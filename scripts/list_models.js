const https = require('https');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("Supported Models:");
                json.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
            } else {
                console.log("No models found or error:");
                console.log(JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.error("Parse error: " + e.message);
            console.log("Raw response: " + data);
        }
    });
}).on('error', (err) => {
    console.error("Request error: " + err.message);
});
