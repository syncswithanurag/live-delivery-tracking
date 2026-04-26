import "dotenv/config";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { TrackingEngine } from "./trackingEngine";

const app = express();
const port = Number(process.env.DELIVERY_SERVER_PORT ?? process.env.PORT ?? 5001);

app.use(cors());
app.use(express.json());

const engine = new TrackingEngine();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tracking/initial", (_req, res) => {
  res.json(engine.getSnapshot());
});

const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

wss.on("connection", (socket) => {
  const snapshot = engine.getSnapshot();

  socket.send(
    JSON.stringify({
      event: "location_update",
      payload: {
        agentLocation: snapshot.agentLocation,
        etaSeconds: snapshot.etaSeconds
      }
    })
  );

  socket.send(
    JSON.stringify({
      event: "order_status_update",
      payload: {
        status: snapshot.orderStatus
      }
    })
  );
});

const broadcast = (event: string, payload: Record<string, unknown>) => {
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
