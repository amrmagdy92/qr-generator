import qrGenerator from "@nimashoghi/qr-code-styling"
import nodeCanvas from "canvas"
import { optionsValidator } from "../helpers/qr.helper"
import qrObject from "../models/qr.model"

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

const generateQR = (devUUID, options) => {
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
                qrObject.find({ device_uuid: devUUID })
                .then( storedQR => {
                    if (storedQR.length > 0) {
                        qrObject.findByIdAndUpdate(storedQR[0]._id, { generated_qr_base64: base64QR, generated_qr_image: buffer })
                        .then( updatedQr => {
                            if (!updatedQr) {
                                reject({
                                    code: 400,
                                    msg: "Cannot update"
                                })
                            } else {
                                resolve({
                                    code: 200,
                                    msg: updatedQr.generated_qr_base64
                                })
                            }
                        })
                    } else {
                        qrObject.create({
                            device_uuid: devUUID,
                            generated_qr_base64: base64QR,
                            generated_qr_image: buffer
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

const deleteGeneratedQR = (devUUID) => {
    return new Promise((resolve, reject) => {
        qrObject.findOneAndDelete({device_uuid: devUUID})
        .then( result => {
            if (!result) {
                reject({
                    code: 404,
                    msg: "Couldn't find related QR object"
                })
            } else {
                resolve({
                    code: 200,
                    msg: "QR object has been deleted successfully"
                })
            }
        })
    })
}

export {
    generateQR,
    defaultQROptions,
    deleteGeneratedQR
}