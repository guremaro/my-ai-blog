const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listAllModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    try {
        console.log("Listing models...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-pro!");
        console.log(result.response.text());
    } catch (e) {
        console.log("Failed with gemini-pro: " + e.message);
    }
}

listAllModels();
