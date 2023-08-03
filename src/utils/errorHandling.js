const logger = require("../libs/winstonLogger")
const AppError = require("./AppError")


module.exports = {
    ErrorHandler: (error, req, res, next) => {

        if (error instanceof AppError) {
            return res.status(error.StatusCode).json({
                status: "failure",
                message: error.ErrorCode,
                error_message: error.message
            })
        }

        return res.status(500).json({
            status: "failure",
            message: "Something went Wrong",
            error_message: error.message
        })
    }
}


