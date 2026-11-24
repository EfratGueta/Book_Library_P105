import Joi from 'joi';

// 1. פונקציית המידלוור הכללית שבודקת את ה-body לפי כל סכמה שנקבל
export const validateBody = (schema) => {
  return (req, res, next) => {
    // בדיקת ה-body לפי הסכמה, עם הגדרה לא לעצור בשגיאה הראשונה (abortEarly: false)
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // איסוף כל הודעות השגיאה שהתקבלו
      const errorMessages = error.details.map((detail) => detail.message);
      
      // החזרת כל השגיאות ללקוח במבנה מסודר
      return res.status(400).json({
        success: false,
        message: 'נכשלו בדיקות התקינות של הנתונים',
        errors: errorMessages
      });
    }
    
    // אם הכל תקין, ממשיכים הלאה לקונטרולר
    next();
  };
};

// 2. סכמה להוספת ספר (כל השדות חובה)
export const bookSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(2).required(),
  category: Joi.string().required(),
  islend: Joi.boolean().required(),
  price: Joi.number().positive().required()
});

// 3. סכמה לעדכון ספר (שדות אופציונליים למקרה שמעדכנים רק חלק מהנתונים)
export const updateBookSchema = Joi.object({
  id: Joi.number().integer().optional(),
  name: Joi.string().min(2).optional(),
  category: Joi.string().optional(),
  islend: Joi.boolean().optional(),
  price: Joi.number().positive().optional()
}).min(1); // דורש לפחות שדה אחד לעדכון