// Gọi biến body để check, validationResult để lấy kết quả validate
const { body, validationResult } = require('express-validator'); 

const validateRule = () => {
    return [
        body('title', 'Title does not empty!').not().isEmpty(),
        body('title', 'Title must more than 6 chars!').isLength({min:6}),
        body('body', 'Body does not empty!').not().isEmpty(),
        body('body', 'Body must more than 6 chars!').isLength({min:6}),
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) next();
    else {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

        return res.status(422).json({
            errors: extractedErrors
        })
    }
}

module.exports = {
    validateRule,
    validate
}

