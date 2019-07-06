const dev = process.env.NODE_ENV !== 'production';
export const API_URL = dev ? 'http://localhost:7777' : process.env.API_URL;
