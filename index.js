require("dotenv").config();
const express = require('express');
const app = express();
const logger = require("pino")();
const { informationLog, errorLog } = require("./log/log");

const YAML = require("yamljs");
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 8989;
const NODE_ENV = process.env.NODE_ENV || 'development';

const swaggerDocument = YAML.load("./swagger.yaml");
swaggerDocument.host = process.env.HOSTIP.split("//")[1];
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(express.json());

// Routes
app.use('/certificates', require('./routes/certificates'));
app.use('/posts', require('./routes/posts'));

app.listen(PORT, () => {
  logger.info(`Backend service is running on ${NODE_ENV} is running on port ${PORT}`);
  informationLog.info({ message: "Application restarted", time: Date.now() });
});

module.exports = app;