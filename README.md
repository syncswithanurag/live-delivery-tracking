# Live Delivery Tracking System

Full-stack real-time delivery tracking app with:

- `client`: React + Vite + TypeScript + Tailwind + Zustand + React Query + Mapbox + Framer Motion
- `server`: Node.js + Express + TypeScript + WebSocket (`ws`)

## Run locally

```bash
cd server
npm install
npm run dev
```

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on Vite default (`http://localhost:5173`) and uses Vite proxy for `/api` and `/ws` by default, which avoids CORS issues in local development.
You can still override with `VITE_API_URL` and `VITE_WS_URL` if needed.

Server reads `DELIVERY_SERVER_PORT` from `server/.env` (already set to `5001`), so it avoids collisions with globally exported `PORT`.

## Features implemented

- Live map with three markers (user, restaurant, delivery agent)
- Smooth delivery-agent movement animation
- WebSocket events:
  - `location_update`
  - `order_status_update`
- Zustand-powered UI state (location, ETA, status, connection)
- React Query initial fetch from backend snapshot API
- Responsive mobile-first layout
- Loading skeleton + API error handling
- Mock route simulation updates every 2 seconds
