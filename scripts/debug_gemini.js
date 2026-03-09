const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function debug() {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 可能なモデル名を試す
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
    
    for (const m of models) {
        try {
            console.log(`Testing model: ${m} with v1...`);
            const model = genAI.getGenerativeModel({ model: m }, { apiVersion: 'v1' });
            const result = await model.generateContent("Hello");
            console.log(`Success with ${m} (v1): ${result.response.text()}`);
            break; 
        } catch (e) {
            console.log(`Failed with ${m} (v1): ${e.message}`);
        }
    }
}

debug();
