import { Schema, model } from "mongoose"

const qr_object = new Schema({
    session_id: {
        type: String,
        required: "Session ID is needed"
    },
    generated_qr_base64: {
        type: String,
        required: "Generated QR string is required"
    }
})

export default model('qr-sessions', qr_object)