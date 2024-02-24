const imageOptionsValidator = (imageOptions) => {
    let errors = {}
    if (typeof imageOptions !== "object") {
        errors["type"] = "Invalid object type"
    } else {
        let imageKeys = Object.keys(imageOptions)
        let invalidKeys = []
        const validKeys = ["typeNumber", "mode", "errorCorrectionLevel"]
        for (let i = 0; i < imageKeys.length; i++) {
            if (!validKeys.includes(imageKeys[i])) {
                invalidKeys.push(imageKeys[i])
            } else if (imageKeys[i] === "typeNumber") {
                if (imageOptions.typeNumber > 40 || imageOptions.typeNumber < 0) {
                    errors["typeNumber"] = "Type number should be between 0 and 40."
                }
            } else if (imageKeys[i] === "mode") {
                let validModes = ["Numeric", "Alphanumeric", "Byte", "Kanji"]
                if (!validModes.includes(imageOptions.mode)) {
                    errors["mode"] = "Image mode should be either Numeric, Alphanumeric, Byte, or Kanji"
                }
            } else if (imageKeys[i] === "errorCorrectionLevel") {
                let validLevels = ["L", "M", "Q", "H"]
                if (!validLevels.includes(imageOptions.errorCorrectionLevel)) {
                    errors["errorCorrectionLevel"] = "Error correction level should be either L, M, Q, or H"
                }
            }
        }
        errors["invalidImageKeys"] = invalidKeys
    }
    return errors
}
const dotsOptionsValidator = (dotsOptions) => {
    let errors = {}
    if (typeof dotsOptions !== "object") {
        errors["type"] = "Invalid object type"
    } else {
        let dotsKeys = Object.keys(dotsOptions)
        let invalidKeys = []
        const validKeys = ["hideBackgroundDots", "imageSize", "margin", "crossOrigin"]
        for (let i = 0; i < dotsKeys.length; i++) {
            if (!validKeys.includes(dotsKeys[i])) {
                invalidKeys.push(dotsKeys[i])
            } else if (dotsKeys[i] === "crossOrigin") {
                if (!(dotsOptions["crossOrigin"] === "anonymous" || dotsOptions["crossOrigin"] === "use-credentials")) {
                    errors["crossOrigin"] = "Invalid crossOrigin value"
                }
            }
        }
        errors["invalidDotsKeys"] = invalidKeys
    }
    return errors
}
const cornersSquareOptionsValidator = (cornersSquareOptions) => {
    let errors = {}
    if (typeof cornersSquareOptions !== "object") {
        errors["type"] = "Invalid object type"
    } else {
        let cornerSquareKeys = Object.keys(cornersSquareOptions)
        let invalidKeys = []
        const validKeys = ["color", "gradient"]
        for (let i = 0; i < cornersSquareOptions.length; i++) {
            if (!validKeys.includes(cornerSquareKeys[i])) {
                invalidKeys.push(cornerSquareKeys[i])
            }
        }
        errors["invalidCornerSquareKeys"] = invalidKeys
    }
    return errors
}
const cornersDotOptionsValidator = (cornersDotOptions) => {
    let errors = {}
    if (typeof cornersDotOptions !== "object") {
        errors["type"] = "Invalid object type"
    } else {
        let cornerDotKeys = Object.keys(cornersDotOptions)
        let invalidKeys = []
        const validKeys = ["color", "gradient", "type"]
        for (let i = 0; i < cornerDotKeys.length; i++) {
            if (!validKeys.includes(cornerDotKeys[i])) {
                invalidKeys.push(cornerDotKeys[i])
            } else if (cornerDotKeys[i] === "type") {
                let validTypes = ["dot", "square", "extra-rounded"]
                if (!validTypes.includes(cornersDotOptions.type)) {
                    errors["cornerDotType"] = "Corner dots type should be either dot, square, or extra-rounded"
                }
            }
        }
        errors["invalidCornerDotKeys"] = invalidKeys
    }
    return errors
}
const backgroundOptionsValidator = (backgroundOptions) => {
    let errors = {}
    if (typeof backgroundOptions !== "object") {
        errors["type"] = "Invalid object type"
    } else {
        let backgroundKeys = Object.keys(backgroundOptions)
        let invalidKeys  = []
        const validKeys = ["color", "gradient", "type"]
        for (let i = 0; i < backgroundKeys.length; i++) {
            if (!validKeys.includes(backgroundKeys[i])) {
                invalidKeys.push(backgroundKeys[i])
            } else if (backgroundKeys[i] === "type") {
                let validTypes = ["rounded", "dots", "classy", "classy-rounded", "square", "extra-rounded"]
                if (!validTypes.includes(backgroundOptions.type)) {
                    errors["backgroundType"] = "Invalid background type"
                }
            }
        }
    }
}

const optionsValidator = (options) => {
    let errors = {}
    if (typeof backgroundOptions !== "object") {
        errors["type"] = "Invalid object type"
    } else {
        let optionsKeys = Object.keys(options)
        let invalidKeys = []
        const validKeys = ["width", "height", "data", "image", "margin", "qrOptions", "imageOptions", "dotsOptions", "cornerSquareOptions", "cornersDotOptionsHelper", "backgroundOptions"]
        for (let i = 0; i < optionsKeys; i++) {
            if (!validKeys.includes(optionsKeys[i])) {
                invalidKeys.push(optionsKeys[i])
            } else if (optionsKeys[i] === "imageOptions") {
                errors.imageOptions = imageOptionsValidator(options.imageOptions)
            } else if (optionsKeys[i] === "dotsOptions") {
                errors.dotsOptions = dotsOptionsValidator(options.dotsOptions)
            } else if (optionsKeys[i] === "cornersSquareOptions") {
                errors.cornerSquareOptions = cornersSquareOptionsValidator(options.cornersSquareOptions)
            } else if (optionsKeys[i] === "cornersDotOptionsHelper") {
                errors.cornerDotsOptions = cornersDotOptionsValidator(options.cornersDotOptionsHelper)
            } else if (optionsKeys[i] === "backgroundOptions") {
                errors.backgroundOptions = backgroundOptionsValidator(options.backgroundOptions)
            }
        }
    }
    return errors
}

export default optionsValidator