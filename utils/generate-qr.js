const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

const create =  async (dataForQRcode) => {
    const canvas = createCanvas(180, 180);
    QRCode.toCanvas(
        canvas,
        dataForQRcode,
        {
            errorCorrectionLevel: "H",
            width: 140, 
            margin: 1,
            color: {
                dark: "#000000",
                light: "#ffffff",
            }
        }
    );
    const ctx = canvas.getContext("2d");
    const imgDim = { 
        width: 70, 
        height: 70 
    };
    const img = await loadImage("public/images/logo.png");
    ctx.drawImage(img, (canvas.width / 2) - (imgDim.width / 2), (canvas.height / 2) - (imgDim.height / 2), imgDim.width, imgDim.height);
    return canvas.toDataURL("image/png");
}

module.exports = create;