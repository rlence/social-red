exports.succes = (req, res, message, status) => {
    // .. 
    let statusCode = status || 200;
    let statusMessage = message || '';
    res.status(statusCode).send({
        error:false,
        status:status,
        body:statusMessage
    })

}

exports.error = (req, res, message, status) =>{
   // .. 
   let statusCode = status || 500;
   let statusMessage = message || 'Internal server error';
    res.status(statusCode).send({
        error:false,
        status:status,
        body:statusMessage
    })
}