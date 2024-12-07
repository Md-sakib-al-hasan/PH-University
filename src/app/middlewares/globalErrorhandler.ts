import { ErrorRequestHandler, NextFunction, } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/hanldevalidationError";
import handleCatError from "../errors/handelCastError";
import handleDuplicatedError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";





// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler:ErrorRequestHandler = (err,req,res,next:NextFunction) => {
     let statusCode = err.statusCode || 500;
     let message = err.message || "Something went wrong"
     let errorSources:TErrorSources = [{
      path:'',
      message:"Something went wrong"
     }]

     if(err instanceof ZodError ){
       
        const simplifiedEroor = handleZodError(err);
        statusCode = simplifiedEroor.statusCode;
        message = simplifiedEroor.message;
        errorSources = simplifiedEroor.errorSources
     }else if(err?.name === "ValidationError") {
    
         const simplifiedEroor = handleValidationError(err)
         statusCode = simplifiedEroor?.statusCode;
         message = simplifiedEroor?.message;
         errorSources = simplifiedEroor?.errorSources

     }else if (err?.name ===  "CastError"){
        
      const simplifiedEroor = handleCatError(err)
      statusCode = simplifiedEroor?.statusCode;
      message = simplifiedEroor?.message;
      errorSources = simplifiedEroor?.errorSources
     }
     else if (err?.code === 11000){
        
      const simplifiedEroor =  handleDuplicatedError(err)
      statusCode = simplifiedEroor?.statusCode;
      message = simplifiedEroor?.message;
      errorSources = simplifiedEroor?.errorSources
     }
     else if (err instanceof AppError){
        
      statusCode = err?.statusCode;
      message = err.message;
      errorSources = [{
           path:'',
           message:err?.message
      }]

     
     }
     else if (err instanceof Error){
        
      message = err.message;
      errorSources = [{
           path:'',
           message:err?.message
      }]

     
     }
       res.status(statusCode).json({
        success:false,
        message,
        errorSources,
        err:err,
        stack: config.node_env === "development"? err?.stack : null
      })
}

export default globalErrorHandler;