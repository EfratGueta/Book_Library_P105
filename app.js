import express, { json } from 'express';
import allRouters from "./route/index.router.js";
import { addDate, printDate, blockDays, PageNotFound } from "./Middlewares/middleware.js";
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// הגדרת __dirname תקינה לסביבת ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5050; // הועבר למעלה כדי שהשרת יכיר את ה-PORT בזמן ההפעלה

// 1. הפיכת תיקיית public לסטטית (בשביל שהתמונות שהמשתמשים מעלים יהיו זמינות לצפייה)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Middlewares כלליים לבקשות
app.use(json());
app.use(morgan('dev')); // פורמט פלט בקונסול
app.use(helmet());     // אבטחת אפליקציית אקספרס

// הגבלת קצבת בקשות (Rate Limit)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 דקות
    max: 100 // מגביל ל-100 בקשות
});
app.use(limiter);

// CORS - גישה בין דומינים
app.use(cors({ origin: 'http://127.0.0.1:5500/lesson7/client.html' }));
app.use(cors());

// 3. Middlewares מותאמים אישית שלך
app.use(addDate, blockDays);
app.use("/get", printDate); // תוקן מ-"get/" ל־"/get"

// 4. ניתוב ראשי של הפרויקט (ספרים ומשתמשים)
app.use("/", allRouters);

// 5. טיפול בשגיאת דף לא נמצא (Page Not Found) - חייב להיות תמיד אחרון לפני ה-listen
app.use(PageNotFound);

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});