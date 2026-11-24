import Joi from 'joi';

// 1. פונקציית המידלוור הכללית שאוספת את כל השגיאות יחד
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'נכשלו בדיקות התקינות של הנתונים',
        errors: errorMessages
      });
    }
    next();
  };
};

// 2. סכמה להרשמת/יצירת משתמש חדש (כל השדות הנדרשים חובה)
export const userRegisterSchema = Joi.object({
  code: Joi.number().integer().required(),
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  borrowedBooks: Joi.array().items(Joi.number().integer()).optional()
});

// 3. סכמה לעדכון פרטי משתמש (שדות אופציונליים למקרה שמעדכנים רק חלק, למשל סיסמה או שם)
export const updateUserSchema = Joi.object({
  code: Joi.number().integer().optional(),
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  borrowedBooks: Joi.array().items(Joi.number().integer()).optional()
}).min(1); // דורש לפחות שדה אחד לעדכון

// 4. סכמה להתחברות משתמש קיים
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});