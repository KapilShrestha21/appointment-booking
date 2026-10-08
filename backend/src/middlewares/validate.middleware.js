import AppError from "../utils/AppError.js";

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const validatedData = await schema.parseAsync(req.body);

            req.body = validatedData;

            next();
        } catch (error) {
            if (error.name === "ZodError") {
                const errors = error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));

                return next(
                    new AppError("Validation failed", 400, errors)
                );
            }

            next(error);
        }
    };
};

export default validate;