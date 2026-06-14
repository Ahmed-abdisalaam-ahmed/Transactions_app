export const notFound = (res, req ,next)=> {
    
    const error = new Error(`Route ${req.originalUrl} Not found`)
    error.statusCode = 404
    next(error)
}

export default notFound; 