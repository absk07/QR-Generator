require('dotenv/config');

const express = require('express');
const path = require('path');
const generateQr = require('./utils/generate-qr');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));


const PORT = Number(process.env.PORT) || 5500;


app.get('/', async (req, res) => {
    const dataForQRcode = {
        name: 'Hello World',
    };
    try {
        const qrCode = await generateQr(JSON.stringify(dataForQRcode));
        // console.log(qrCode);
        res.send(`
            <h2>QRCode Generated</h2>
            <div><img src='${qrCode}'/></div>
        `);
    } catch(err) {
        // console.log(err);
        res.status(500).send('Error generating QR code');
    }
});


app.listen(PORT, () => {
    console.log('SERVER RUNNING ON PORT', PORT);
});