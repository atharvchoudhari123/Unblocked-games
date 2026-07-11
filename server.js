import express from 'express';
import http from 'http';
import { wispServer } from '@clover-network/wisp-server-node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Serve everything from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html inside the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling WebSocket proxy requests (Wisp Protocol)
server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/wisp/')) {
        wispServer(req, socket, head);
    } else {
        socket.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`Scramjet Game Server running on http://localhost:${PORT}`);
});
