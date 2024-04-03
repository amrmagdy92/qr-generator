import { Schema, model } from "mongoose"

const qr_object = new Schema({
    device_uuid: {
        type: String,
        required: "Device UUID is required"
    },
    generated_qr_base64: {
        type: String,
        required: "Generated QR string is required"
    },
    generated_qr_image: {
        type: Buffer,
        required: "Image is required"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default model('qr-sessions', qr_object)