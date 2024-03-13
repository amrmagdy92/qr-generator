import qrGenerator from "@nimashoghi/qr-code-styling"
import nodeCanvas from "canvas"
import { optionsValidator } from "../helpers/qr.helper"
import qrObject from "../models/qr_session.model"

const defaultQROptions = () => {
    return {
        code: 200,
        msg: {
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
    }
}

const generateQR = (sid, options) => {
    return new Promise((resolve, reject) => {
        let validationErrors = optionsValidator(options)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            let nodeOptions = {nodeCanvas, ...options}
            new qrGenerator(nodeOptions).download({ buffer: true })
            .then((buffer) => {
                const base64QR = buffer.toString('base64')
                qrObject.find({ session_id: sid })
                .then( storedQR => {
                    if (storedQR.length > 0) {
                        qrObject.findByIdAndUpdate(storedQR._id, { generated_qr_base64: base64QR })
                        .then( updatedQr => {
                            resolve({
                                code: 200,
                                msg: updatedQr.generated_qr_base64
                            })
                        })
                    } else {
                        qrObject.create({
                            session_id: sid,
                            generated_qr_base64: base64QR
                        }).then( createdQR => {
                            resolve({
                                code: 200,
                                msg: createdQR.generated_qr_base64
                            })
                        })
                    }
                })
            }).catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}

export {
    generateQR,
    defaultQROptions
}