/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse } from "../interface/error.type"



 export  const handleDuplicateError = (err: any): TGenericErrorResponse =>{
    const matchedArray= err.message.match(/"([^"]*)"/)

     return {
       statusCode: 400,
       message: `${matchedArray[1]} already exists`
     }
    }