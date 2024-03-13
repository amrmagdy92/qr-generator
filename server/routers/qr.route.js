import { Router } from "express"
import { generateQR } from "../controllers/qr.controller"

const router = Router()

router.route('/')
    .post((request, response) => {
        generateQR(request.session.id ,request.body.options)
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