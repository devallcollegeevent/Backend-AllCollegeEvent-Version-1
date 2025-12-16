import winston from "winston";
import "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

// Define logs directory name
const logDir = "logs";

// Create logs folder if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure daily rotating file transport
const transport = new winston.transports.DailyRotateFile({
  dirname: logDir,              // Logs directory
  filename: "app-%DATE%.log",   // Log file name pattern
  datePattern: "YYYY-MM-DD",    // Rotate logs daily
  zippedArchive: true,          // Compress old logs
  maxSize: "10m",               // Max file size before rotation
  maxFiles: "14d",              // Keep logs for 14 days
});

// Create Winston logger instance
const logger = winston.createLogger({
  level: "info", // Default log level

  // Log format configuration
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((log) => {
      // Custom log output format
      return `[${log.timestamp}] [${log.level.toUpperCase()}] → ${log.message}`;
    })
  ),

  // Log transports
  transports: [
    new winston.transports.Console(), // Output logs to console
    transport,                        // Output logs to rotating file
  ],
});

// Export logger for global use
export default logger;
