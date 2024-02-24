import http from "http"
import app from "./app"

http.createServer(app).listen(process.env.SERVER_PORT, (err) => {
    if ( err ) {
        console.log(`HTTP server was not started because of this error: ${err}`)
        // TODO: Add error handler here
    } else {
        console.log(`Server started on worker ${process.pid} and listening on port ${process.env.SERVER_PORT}`)
        // TODO: Add success handler here
    }
})