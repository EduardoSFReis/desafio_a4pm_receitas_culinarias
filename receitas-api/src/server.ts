import 'dotenv/config';
import http from 'http';
import app from './app';

const PORT = Number(process.env.PORT ?? 3000);
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/docs`);
  console.log(`Health: http://localhost:${PORT}/health`);
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  server.close(() => process.exit(0));
});
