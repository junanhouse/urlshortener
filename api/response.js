module.exports = {
    _400: function(ErrorMessage){
        const response = {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: ErrorMessage,
        }
        return response;
    },
    _200: function(result){
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        return response;    
    },
    _301: function(result){
        const response = {
            statusCode: 301,
            headers: {
                Location: result
            }
        }
        return response;
    },
    _500: function(ErrorMessage){
        const response = {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain'},
            body: ErrorMessage,
        }
        return response;
    }
}