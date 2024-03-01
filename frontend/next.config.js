/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mui/x-charts'],
    env: {
        BACKEND_URL: 'http://localhost:8000/',
    },
};

module.exports = nextConfig;
