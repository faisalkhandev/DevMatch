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

const editUserProfileSchema = z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().optional(),
    emailId: z.string().email("Invalid email address").optional(),
    age: z.number().min(18, "Minimum age is 18").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    photoUrl: z.string().url("Invalid URL").optional(),
    about: z.string().optional(),
    skills: z.array(z.string()).optional(),
    isPremium: z.boolean().optional()
}).strict()

const passwordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .refine(
            (val) => /[A-Z]/.test(val) && /[0-9]/.test(val),
            {
                message: "New password must contain at least one uppercase letter and one number",
            }
        ),
}).strict();

module.exports = {
    signUpSchema,
    logInSchema,
    editUserProfileSchema,
    passwordSchema,
};
