// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors())

// Route to handle API requests
app.get('/generate-qr', async (req, res) => {
    const text = req.headers["text"];

    try {
        const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';

        const inputText = text

// Escape double quotes in inputText
        const escapedText = inputText.replace(/"/g, '\\"');

        // Manually construct the JSON string with escapedText
        const bodyContent = "{\"data\":\"" + escapedText + "\",\"config\":{\"body\":\"square\",\"eye\":\"frame0\",\"eyeBall\":\"ball0\",\"erf1\":[],\"erf2\":[],\"erf3\":[],\"brf1\":[],\"brf2\":[],\"brf3\":[],\"bodyColor\":\"#000000\",\"bgColor\":\"#FFFFFF\",\"eye1Color\":\"#000000\",\"eye2Color\":\"#000000\",\"eye3Color\":\"#000000\",\"eyeBall1Color\":\"#000000\",\"eyeBall2Color\":\"#000000\",\"eyeBall3Color\":\"#000000\",\"gradientColor1\":\"\",\"gradientColor2\":\"\",\"gradientType\":\"linear\",\"gradientOnEyes\":\"true\",\"logo\":\"\",\"logoMode\":\"default\"},\"size\":1000,\"download\":\"imageUrl\",\"file\":\"svg\"}";
        const response = await fetch("https://api.qrcode-monkey.com//qr/custom", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "text/plain;charset=UTF-8",
              "priority": "u=1, i",
              "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "Referer": "https://www.qrcode-monkey.com/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": bodyContent,
            "method": "POST"
          });
        console.log(response)

        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }

        const responseJson = await response.json();
        console.log(responseJson)
        res.json(responseJson);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while generating the QR code' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
