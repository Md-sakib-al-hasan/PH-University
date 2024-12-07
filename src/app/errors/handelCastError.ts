import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCatError = (err: mongoose.Error.CastError):TGenericErrorResponse => {
    
    const errorSources:TErrorSources = [{
         path:err?.path,
         message:err?.message
    }]  

    const statusCode =400;
    const message = "Invalide Id"

    return {
        statusCode,
        message,
        errorSources,
    }
}

export default handleCatError;