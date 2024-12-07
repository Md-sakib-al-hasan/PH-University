import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicatedError = (err:any):TGenericErrorResponse => {

const  match = err.message.match(/"([^"]*)"/);

const extractedMessage = match && match[1];

const errorSources:TErrorSources = [{
     path:'',
     message:`${extractedMessage} is all ready exites`
}]

 return {
    message:"Duplicate name error",
    statusCode:400,
    errorSources,
 }
}
export default handleDuplicatedError;