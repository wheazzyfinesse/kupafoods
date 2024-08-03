// validationSchema.js
import * as z from "zod";

// Base schema for login
const baseSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(3, { message: "Password must be at least 3 characters long" }),
});

// Schema for register
const registerSchema = baseSchema
    .extend({
        confirmPassword: z.string().min(3, {
            message: "Confirm Password must be the same as your password",
        }),
        username: z.string().min(1, { message: "Username is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // Path of error
    });


// Schema for profile
const profileSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }).optional(),
        username: z.string().min(1, { message: "Username is required" }).optional(),
        phone: z
            .string()
            .min(9, { message: "Phone number must be at least 9 digits long" })
            .regex(/^\d+$/, { message: "Invalid phone number" })
            .optional(),
        password: z
            .string()
            .min(3, { message: "Password must be at least 3 characters long" })
            .optional(),
        confirmPassword: z
            .string()
            .min(3, { message: "Confirm Password must be at least 3 characters long" })
            .optional(),
        // image: z.string().min(1, { message: "Image is required" }).optional(),
        address: z.string().min(1, { message: "Address is required" }).optional(),
        city: z.string().min(1, { message: "City is required" }).optional(),
        state: z.string().min(1, { message: "State is required" }).optional(),
        zip: z
            .string()
            .min(1, { message: "ZIP code is required" })
            .regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code" })
            .optional(),
        country: z.string().min(1, { message: "Country is required" }).optional(),
    })
    .refine((data) => !data.password || data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // Path of error
    });



const productSchema = z.object({
    title: z.string().min(1, { message: "Product title is required" }),
    brand: z.string().min(1, { message: "Product brand is required" }),
    description: z
        .string()
        .min(1, { message: "Product description is required" }),
    price: z
        .number()
        .positive({ message: "Price must be a positive number" })
        .min(0.01, { message: "Price must be at least 0.01" }),
    quantity: z
        .number()
        .int({ message: "Quantity must be an integer" })
        .nonnegative({ message: "Quantity cannot be negative" }),
    image: z.string().min(1, { message: "Product image is required" }),
    category: z.string().min(1, { message: "Category is required" }),
});

// const optionalProductSchema = productSchema.partial({
// 	title: true,
// 	brand: true,
// 	description: true,
// 	price: true,
// 	quantity: true,
// 	image: true,
// 	category: true,
// });

const propertySchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    image: z.string().min(1, { message: "Image URL is required" }).optional(),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    bedrooms: z.number().min(1, { message: "Number of bedrooms is required" }),
    bathrooms: z
        .number()
        .min(1, { message: "Number of bathrooms must be at least 1" }),
    squaremeters: z
        .number()
        .min(1, { message: "Square meters must be at least 1" }),
    description: z.string().min(1, { message: "Description is required" }),
    location: z.string().min(1, { message: "Location is required" }),
});

const otpSchema = z.object({
    otp: z.number().min(1, { message: "OTP is required" }),
});
const categorySchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});
const searchSchema = z.object({
    key: z.string().min(1, { message: "search word is required" }),
});
const enquirySchema = z.object({
    subject: z.string().min(4, { message: "Enquiry must have a subject" }),
    message: z.string().min(20, { message: "Enquiry must have a Message" }),
});
const anonEnquirySchema = z.object({
    lastName: z.string().min(1, { message: "First Name is required" }),
    firstName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
        .string()
        .min(9, { message: "Phone number must be at least 9 digits long" })
        .regex(/^\d+$/, { message: "Invalid phone number" }),

    message: z.string().min(20, { message: "Enquiry must have a Message" }),
});

export {
    baseSchema,
    registerSchema,
    profileSchema,
    // optionalProfileSchema,
    productSchema,
    // optionalProductSchema,
    categorySchema,
    searchSchema,
    enquirySchema,
    propertySchema,
    otpSchema,
    anonEnquirySchema
};
