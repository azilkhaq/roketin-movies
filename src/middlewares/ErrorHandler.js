const errorLogger = (error, request, response, next) => {
    console.log(`error ${error.message}`)
    next(error)
}

const errorResponder = (error, request, response, next) => {
    response.failServerError(error.message);
}

const invalidPathHandler = (request, response, next) => {
    response.failNotFound('Page not found');
}

module.exports = {
    errorLogger,
    errorResponder,
    invalidPathHandler
}