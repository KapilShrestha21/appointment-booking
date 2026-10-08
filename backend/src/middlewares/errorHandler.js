const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    console.error("Error:", err.stack || err);
    
    return res.status(statusCode).json({
        status: statusCode,
        message
    })
}

export default errorHandler;
