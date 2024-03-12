import { Schema, model } from "mongoose"

const qr_object = new Schema({
    session_id: {
        type: String,
        required: "Session ID is needed"
    },
    options: {
        type: String,
        required: "QR Options is required",
        default: {
            "width": 300,
            "height": 300,
            "data": "https://www.linkedin.com/in/amaa/",
            "margin": 0,
            "qrOptions": {
                "typeNumber": "0",
                "mode": "Byte",
                "errorCorrectionLevel": "H"
            },
            "imageOptions": {
                "hideBackgroundDots": true,
                "imageSize": 0.2,
                "margin": 0
            },
            "dotsOptions": {
                "type": "dots",
                "color": "#0a66c2"
            },
            "backgroundOptions": {
                "color": "#ffffff"
            },
            "image": "",
            "dotsOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#6a1a4c",
                    "color2": "#6a1a4c",
                    "rotation": "0"
                }
            },
            "cornersSquareOptions": {
                "type": "dot",
                "color": "#0a66c2"
            },
            "cornersSquareOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#000000",
                    "color2": "#000000",
                    "rotation": "0"
                }
            },
            "cornersDotOptions": {
                "type": "",
                "color": "#000000"
            },
            "cornersDotOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#000000",
                    "color2": "#000000",
                    "rotation": "0"
                }
            },
            "backgroundOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#ffffff",
                    "color2": "#ffffff",
                    "rotation": "0"
                }
            }
        }
    },
    generated_qr_base64: {
        type: String,
        required: "Generated QR string is required"
    }
})

export default model('qr-sessions', qr_object)