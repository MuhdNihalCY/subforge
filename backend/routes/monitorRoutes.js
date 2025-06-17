const express = require('express');
const router = express.Router();
const monitorController = require('../controllers/monitorController');

/**
 * @swagger
 * /api/monitor/status:
 *   get:
 *     summary: Get MongoDB connection status
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: MongoDB status retrieved successfully
 *       503:
 *         description: MongoDB connection is not available
 */
router.get('/status', monitorController.getMongoStatus);

/**
 * @swagger
 * /api/monitor/metrics:
 *   get:
 *     summary: Get system metrics
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: System metrics retrieved successfully
 */
router.get('/metrics', monitorController.getMetrics);

/**
 * @swagger
 * /api/monitor/health:
 *   get:
 *     summary: MongoDB health check
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: Health check successful
 *       503:
 *         description: Health check failed
 */
router.get('/health', monitorController.healthCheck);

module.exports = router;
