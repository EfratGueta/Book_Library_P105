export const addDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
};

export const printDate = (req, res, next) => {
    console.log(req.currentDate)
    next();
};

export function blockDays(req, res, next) {
    const now = req.currentDate;

    if ((now.getDay() == 5 && now.getHours() > 12) || (now.getDay() == 6 && now.getHour() < 10)) {
        res.status(400).json({ error: "האתר חסום היום, נסה ביום אחר..." });
    } else {
        next();
    }
};

export const ErrorM=(error,req,res,next)=>{
     res.status(error.status||500)
        .json({error:{massage:"...",type:"server error",stack:error.stack}})
};

export const PageNotFound=(req,res,next)=>{
    const error=new error("the page is Not Found");
    error.status=404;
    next(error);
}

const Joi = require('joi');


// פונקציית יוצרת מידלוור שמקבלת סכמה של Joi
const validateBody = (schema) => {
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
}}