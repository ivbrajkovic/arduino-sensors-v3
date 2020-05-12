/**
 * Application configuration
 */

// App utility module
const { env } = require('@api/utils');

module.exports = {
  debug: env('DEBUG', 'api:*'),
  env: env('NODE_ENV', 'development'),
  port: env('PORT', 3000),
  serveDir: env('SERVE_DIR', 'build'),
  baseApiUrl: env('BASE_API_URL', '/api'),
  bcryptSalt: env('BCRYPT_SALT', '10'),
  jwtExp: env('JWT_EXP', '2h'),
  jwtSecret: env('JWT_SECRET', 'secret')
};
