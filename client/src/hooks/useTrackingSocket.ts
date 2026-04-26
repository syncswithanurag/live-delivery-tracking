import { useEffect } from "react";
import { OrderStatus } from "../types/tracking";
import { useTrackingStore } from "../store/trackingStore";

type LocationPayload = {
  agentLocation: { lat: number; lng: number };
  etaSeconds: number;
};

type StatusPayload = {
  status: OrderStatus;
};

type SocketEvent =
  | { event: "location_update"; payload: LocationPayload }
  | { event: "order_status_update"; payload: StatusPayload };

const defaultWsUrl = `${window.location.protocol === "https:" ? "wss" : "ws"}://${
  window.location.host
}/ws`;
const WS_URL = import.meta.env.VITE_WS_URL ?? defaultWsUrl;

export const useTrackingSocket = () => {
  const updateAgentLocation = useTrackingStore((state) => state.updateAgentLocation);
  const updateOrderStatus = useTrackingStore((state) => state.updateOrderStatus);
  const setConnection = useTrackingStore((state) => state.setConnection);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setConnection(true);
    };

    socket.onclose = () => {
      setConnection(false);
    };

    socket.onerror = () => {
      setConnection(false);
    };

    socket.onmessage = (message) => {
      try {
        const parsedData = JSON.parse(message.data) as SocketEvent;

        if (parsedData.event === "location_update") {
          updateAgentLocation(parsedData.payload.agentLocation, parsedData.payload.etaSeconds);
        }

        if (parsedData.event === "order_status_update") {
          updateOrderStatus(parsedData.payload.status);
        }
      } catch (error) {
        console.error("Invalid WebSocket message", error);
      }
    };

    return () => {
      socket.close();
    };
  }, [setConnection, updateAgentLocation, updateOrderStatus]);
};
