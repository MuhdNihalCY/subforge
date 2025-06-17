const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const compression = require('compression');
const cors = require('cors');
const specs = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');
const monitorRoutes = require('./routes/monitorRoutes');
const errorHandler = require('./middlewares/errorHandler');
const mongoDbMetrics = require('./middlewares/mongoDbMetrics');
const config = require('./config/config');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(compression()); // Enable compression
app.use(express.json());
app.use(mongoDbMetrics()); // Add MongoDB metrics tracking

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/monitor', monitorRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongoMetrics: req.mongoMetrics
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
