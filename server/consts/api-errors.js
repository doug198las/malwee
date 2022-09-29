const errors = [];

addError = (code, desc, http) => {
    const obj = {
        codeError : code,
        descError : desc,
        httpError : 400
    };

    if (http){
        obj.httpError = http;
    }

    errors.push(obj);
}

getApiErrorCode = (error) =>{
    if (!error){
        return;
    }

    return errors.find(element => element.codeError == error);
}

addError('0003', 'JSON with invalid fields / without required fields / with invalid values');
addError('0004', 'Invalid token', 403);
addError('0005', 'Logon denied', 401);


exports.getApiErrorCode = getApiErrorCode;