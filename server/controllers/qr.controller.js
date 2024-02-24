import fs from "fs"
import qrGenerator from "@nimashoghi/qr-code-styling"
import nodeCanvas from "canvas"
import { optionsValidator } from "../helpers/qr.helper"

const generateQR = (options) => {
    return new Promise((resolve, reject) => {
        let validationErrors = optionsValidator(options)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            let nodeOptions = {nodeCanvas, ...options}
            let generatedQR = new qrGenerator(nodeOptions).download({ buffer: true })
            .then((buffer) => {
                let qrName = `qr_${Date.now()}.png`
                fs.writeFileSync(qrName, buffer)
                let file = fs.readFileSync(qrName)
                resolve({
                    code: 200,
                    msg: file
                })
            })
        }
    })
}

export {
    generateQR
}