const reducer = require('./reducer')

// Handler for errors
module.exports = (err, req, res, next) => {
    // Get the error response details relevant to this error
    let { status, message, logError } = reducer( err )

    // Should I log this error?
    if ( logError ) {
        // You could add custom logging here.
        // For simplicity, I am just console logging
        logger.error({
            message: err.message,
            stack: err.stack,
            method: req.method,
            path: req.path
        })
    }

    // Send the error response
    res.status( status ).json({ error: message })

}