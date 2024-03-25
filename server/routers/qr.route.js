import { Router } from "express"
import { generateQR, defaultQROptions, deleteGeneratedQR } from "../controllers/qr.controller"

const router = Router()

router.route('/')
    .get((request, response) => {
        let payload = defaultQROptions()
        response.status(payload.code).json({ msg: payload.msg })
    })
    .post((request, response) => {
        generateQR(request.body.device ,JSON.parse(request.body.data))
        .then(result => {
            let responseCode = result.code
            let data = result.msg
            response.status(responseCode).json({ msg: data })
        })
        .catch( error => {
            let responseCode = error.code
            let errorMessage = error.msg
            response.status(responseCode).json({ msg: errorMessage })
        })
    })
    .delete((request, response) => {
        deleteGeneratedQR(request.body.device)
        .then(result => {
            let responseCode = result.code
            let data = result.msg
            response.status(responseCode).json({ msg: data })
        })
        .catch( error => {
            let responseCode = error.code
            let errorMessage = error.msg
            response.status(responseCode).json({ msg: errorMessage })
        })
    })

export default router