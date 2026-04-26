import { LatLng, OrderStatus, TrackingSnapshot } from "./types";

const routePath: LatLng[] = [
  { lat: 28.6139, lng: 77.209 }, // Restaurant
  { lat: 28.6152, lng: 77.2115 },
  { lat: 28.617, lng: 77.2148 },
  { lat: 28.6196, lng: 77.218 },
  { lat: 28.6224, lng: 77.2209 },
  { lat: 28.6248, lng: 77.2236 },
  { lat: 28.6272, lng: 77.2262 } // User
];

const statusCheckpoints: Array<{ routeIndex: number; status: OrderStatus }> = [
  { routeIndex: 0, status: "order_placed" },
  { routeIndex: 1, status: "preparing" },
  { routeIndex: 2, status: "picked_up" },
  { routeIndex: 4, status: "on_the_way" },
  { routeIndex: routePath.length - 1, status: "delivered" }
];

export type TickResult = {
  location: LatLng;
  etaSeconds: number;
  status?: OrderStatus;
};

export class TrackingEngine {
  private routeIndex = 0;
  private currentStatus: OrderStatus = "order_placed";

  readonly userLocation = routePath[routePath.length - 1];
  readonly restaurantLocation = routePath[0];

  getSnapshot(): TrackingSnapshot {
    return {
      userLocation: this.userLocation,
      restaurantLocation: this.restaurantLocation,
      agentLocation: routePath[this.routeIndex],
      etaSeconds: this.getEtaSeconds(),
      orderStatus: this.currentStatus
    };
  }

  tick(): TickResult {
    if (this.routeIndex < routePath.length - 1) {
      this.routeIndex += 1;
    }

    const statusChange = statusCheckpoints.find(
      (checkpoint) => checkpoint.routeIndex === this.routeIndex
    );

    if (statusChange && statusChange.status !== this.currentStatus) {
      this.currentStatus = statusChange.status;
    }

    return {
      location: routePath[this.routeIndex],
      etaSeconds: this.getEtaSeconds(),
      status: statusChange?.status
    };
  }

  private getEtaSeconds() {
    const pointsRemaining = routePath.length - 1 - this.routeIndex;
    return pointsRemaining * 120;
  }
}
