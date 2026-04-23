import 'dotenv/config'

process.env.JWT_SECRET = 'test-jwt-secret-at-least-32-characters-long'
process.env.REFRESH_TOKEN_SECRET = 'test-refresh-secret-at-least-32-characters'
process.env.JWT_EXPIRES_IN = '15m'
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d'
process.env.NODE_ENV = 'test'
