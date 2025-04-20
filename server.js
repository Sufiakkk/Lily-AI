const express = require('express');
const axios = require('axios');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require('./firebase-service-account.json')),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

app.post('/getAIResponse', async (req, res) => {
    const { query } = req.body;
    const aiResponse = await getAIResponse(query);
    res.json({ response: aiResponse });
});

async function getAIResponse(query) {
    const response = await axios.post('https://api.gemini.ai/query', {
        prompt: query,
        apiKey: process.env.GEMINI_API_KEY
    });

    return `Hi! I'm Lily, here's my response: ${response.data}`;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
