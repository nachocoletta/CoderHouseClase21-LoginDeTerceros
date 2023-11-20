import http from 'http';

import app from './app.js';
import { init } from './socket.js';
import 'dotenv/config';

// await init();

// const server = http.createServer(app);
const SERVER_PORT = process.env.SERVER_PORT || 8080;


const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT} 🚀`);
});

await init(httpServer);
// server.listen(PORT, () => {
//   console.log(`Server running in http://localhost:${PORT} 🚀`);
// });
