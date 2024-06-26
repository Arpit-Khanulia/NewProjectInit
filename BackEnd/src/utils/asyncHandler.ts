import { Response,Request,NextFunction } from "express"

export const asyncHandler = (fn:any) => async (req:Request, res:Response, next:NextFunction) => {
    try {
        await fn(req, res, next)
    } catch (error:any) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}