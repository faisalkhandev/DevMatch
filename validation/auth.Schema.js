

const { z } = require("zod");

const signUpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    emailId: z.string().trim().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine(
            (val) => /[A-Z]/.test(val) && /[0-9]/.test(val),
            {
                message: "Password must contain at least one uppercase letter and one number",
            }
        ),
});

const logInSchema = z.object({
    emailId: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

module.exports = {
    signUpSchema,
    logInSchema,
};
