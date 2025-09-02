import { body, validationResult } from 'express-validator';

// Validation middleware to handle errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
            success: false,
        });
    }
    next();
};

// Job validation rules
export const validateJobCreation = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters'),
    body('requirements')
        .notEmpty()
        .withMessage('Requirements are required'),
    body('salary')
        .isNumeric()
        .isFloat({ min: 0 })
        .withMessage('Salary must be a positive number'),
    body('experienceLevel')
        .isInt({ min: 0, max: 50 })
        .withMessage('Experience level must be between 0 and 50 years'),
    body('location')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters'),
    body('jobType')
        .isIn(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'])
        .withMessage('Invalid job type'),
    body('position')
        .isInt({ min: 1, max: 1000 })
        .withMessage('Position count must be between 1 and 1000'),
    body('companyId')
        .isMongoId()
        .withMessage('Invalid company ID'),
    handleValidationErrors
];

// User registration validation
export const validateUserRegistration = [
    body('fullname')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Full name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('phoneNumber')
        .isMobilePhone()
        .withMessage('Please provide a valid phone number'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .isIn(['student', 'recruiter'])
        .withMessage('Role must be either student or recruiter'),
    handleValidationErrors
];

// User login validation
export const validateUserLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

// Company validation
export const validateCompanyCreation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Company name must be between 2 and 100 characters'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
    body('website')
        .optional()
        .isURL()
        .withMessage('Please provide a valid website URL'),
    body('location')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters'),
    handleValidationErrors
];
