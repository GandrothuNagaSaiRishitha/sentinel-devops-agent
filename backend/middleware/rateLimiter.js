// backend/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

// General API limit: 100 requests per minute per IP
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,        // 1 minute
    max: 100,
    standardHeaders: true,       // Return rate limit info in headers
    legacyHeaders: false,
    message: {
        error: 'Too many requests, please slow down.',
        retryAfter: 60,
    },
});

// Stricter limit for heal endpoint: 10 per minute (LLaMA is expensive)
const healLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        error: 'Heal endpoint rate limit reached. Max 10 per minute.',
    },
});

module.exports = { apiLimiter, healLimiter };