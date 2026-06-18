export const extractErrorMessage = (error) => {
    // handle if error not there
    if(!error) return null;


    if(error.response?.data){

        const data = error.response.data;
        
        // handle array of errors
        if(data.error && Array.isArray(data.error)){
            return data.error.map(err => err.message).join(",")
        }
        // handle array of errors in different format
        if(data.errors && Array.isArray(data.errors)){
            return data.errors.map(err => err.message).join(",")
        }

        // handle single error message
        if(data.message){
            return data.message
        }

        // handle error fields
        
        if(data.error){
            return data.error
        }
    }

    // handle network error
    if(error.request && !error.response){
        return "Network Error , Please check your connection"
    }

    // Fall back to error 

    if(error.message){
        return error.message
    }

    // handle Other types of errors
    return "something went wrong, please try again"
}