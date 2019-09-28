const errors = require('./errors')

// Default Error Details
const defaultDetails = {
    status: 500,
    message: 'Something failed!',
    logError: true
}

// Defines how to handle individual errors (typically will be used for special cases)
module.exports = err => {
    switch ( err.message ) {
        // Handle CORS errors
        case errors.CORS_ORIGIN:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Not authorized by CORS',
                logError: false
            } 
        // Handle the default action   
        default: 
            return defaultDetails 
    }
}