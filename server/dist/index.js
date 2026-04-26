"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = require("ws");
const trackingEngine_1 = require("./trackingEngine");
const app = (0, express_1.default)();
const port = Number(process.env.DELIVERY_SERVER_PORT ?? process.env.PORT ?? 5001);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const engine = new trackingEngine_1.TrackingEngine();
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.get("/api/tracking/initial", (_req, res) => {
    res.json(engine.getSnapshot());
});
const httpServer = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server: httpServer, path: "/ws" });
wss.on("connection", (socket) => {
    const snapshot = engine.getSnapshot();
    socket.send(JSON.stringify({
        event: "location_update",
        payload: {
            agentLocation: snapshot.agentLocation,
            etaSeconds: snapshot.etaSeconds
        }
    }));
    socket.send(JSON.stringify({
        event: "order_status_update",
        payload: {
            status: snapshot.orderStatus
        }
    }));
});
const broadcast = (event, payload) => {
    const message = JSON.stringify({ event, payload });
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
};
setInterval(() => {
    const result = engine.tick();
    broadcast("location_update", {
        agentLocation: result.location,
        etaSeconds: result.etaSeconds
    });
    if (result.status) {
        broadcast("order_status_update", {
            status: result.status
        });
    }
}, 2000);
httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
