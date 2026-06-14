
export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    console.log("result")

    if(!result.success){
        const formatted = result.error.format();
        console.log("Formatted", formatted)
        console.log("formatted",  Object.keys(formatted))
        res.status(400).json({
            success: false,
            message: "Validation is Failed",
            error: Object.keys(formatted).map(field => ({
                field,
                message: formatted[field]._error?.[0] || "Invalid input"
            }))
        })
    }
    next()
}