import { Router } from "express"
import { generateQR, defaultQROptions, deleteGeneratedQR } from "../controllers/qr.controller"

const router = Router()

router.route('/')
    .get((request, response) => {
        let payload = defaultQROptions()
        response.status(payload.code).json({ msg: payload.msg })
    })
    .post((request, response) => {
        generateQR(request.session.id ,request.body)
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
        deleteGeneratedQR(request.session.id)
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