exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/yodots';
exports.PORT = process.env.PORT || 3000;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8080';