const handleResponse = (res, status, message, data = null) => {
    const isSuccess = status >=200 && status < 300;

    res.status(status).json({
        status: isSuccess ? 'success' : 'error',
        statusCode: status,
        message,
        data,
    })
}

export default handleResponse;