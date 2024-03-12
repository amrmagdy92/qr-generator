import qrGenerator from "@nimashoghi/qr-code-styling"
import nodeCanvas from "canvas"
import { optionsValidator } from "../helpers/qr.helper"
import qrObject from "../models/qr_session.model"

// TODO: Implement the below logic in a new function
// 1. check for incoming updates
// 2. check the database based on the session id
// 3. retrieve the options field
// 4. update the options field based on the new options given
// 5. return the new options

const generateOptions = (session, options) => {}

// TODO: Implement a function when the client sends a GET request, the server responds with the default QR options values

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
    generateQR
}