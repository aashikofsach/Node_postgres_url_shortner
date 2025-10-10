import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import sequelize from './config/db.js';
import dbInit from './dbInit.js';
import urlRoute from './routes/url.js';
import staticRoute from './routes/staticRouter.js';
import userRouter from './routes/userRouter.js';
import { handleAnalyticsData } from './controllers/url.js';
import { checkAuthentication } from './middleware/authmiddleware.js';
import URL from './models/url.js';

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuthentication);

app.use('/user', userRouter);
app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const result = await URL.findOne({ where: { shortId } });
    if (!result)
        return res.status(404).json({ status: "404 not found", message: "data is not present" });

    const updatedHistory = [...result.visitHistory, { timestamp: new Date() }];
    await URL.update({ visitHistory: updatedHistory }, { where: { shortId } });

    return res.redirect(result.redirectUrl);
});

app.get('/analytics/:shortId', handleAnalyticsData);

app.get('/url/test', async (req, res) => {
    const result = await URL.findAll({ raw: true });
    return res.render('home', { urls: result });
});

// ✅ The proper way to sync and start the server
const startServer = async () => {
    try {
        // Initialize models and associations
        dbInit();

        // Wait for Sequelize to sync models with DB
        await sequelize.sync({ alter: true });
        console.log("✅ All models synced with database!");

        // Start Express server only after sync is successful
        app.listen(PORT, () => console.log(`🚀 Server started on port: ${PORT}`));
    } catch (err) {
        console.error("❌ Error syncing DB:", err);
    }
};

startServer();
