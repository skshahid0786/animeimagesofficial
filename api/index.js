import express from 'express';
import greetings from './category/greetings.js';
import notes from './category/notes.js';
import conversions from './category/conversions.js';
import fun from './category/fun.js';
import tips from './category/tips.js';
import timeRoutes from './category/time.js';
import apis from './category/apis.js';
import images from './category/images.js';

const app = express();
app.use(express.json());

// Mount all route files
app.use('/api/greetings', greetings);
app.use('/api/notes', notes);
app.use('/api/conversions', conversions);
app.use('/api/fun', fun);
app.use('/api/tips', tips);
app.use('/api/time', timeRoutes);
app.use('/api/apis', apis);
app.use('/api/images', images);

// Root endpoint
app.get('/', (req, res) => {
    res.json({ success: true, message: "API is running!" });
});

// Export for Vercel
export default app;
