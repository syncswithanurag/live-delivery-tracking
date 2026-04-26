"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingEngine = void 0;
const routePath = [
    { lat: 28.6139, lng: 77.209 }, // Restaurant
    { lat: 28.6152, lng: 77.2115 },
    { lat: 28.617, lng: 77.2148 },
    { lat: 28.6196, lng: 77.218 },
    { lat: 28.6224, lng: 77.2209 },
    { lat: 28.6248, lng: 77.2236 },
    { lat: 28.6272, lng: 77.2262 } // User
];
const statusCheckpoints = [
    { routeIndex: 0, status: "order_placed" },
    { routeIndex: 1, status: "preparing" },
    { routeIndex: 2, status: "picked_up" },
    { routeIndex: 4, status: "on_the_way" },
    { routeIndex: routePath.length - 1, status: "delivered" }
];
class TrackingEngine {
    constructor() {
        this.routeIndex = 0;
        this.currentStatus = "order_placed";
        this.userLocation = routePath[routePath.length - 1];
        this.restaurantLocation = routePath[0];
    }
    getSnapshot() {
        return {
            userLocation: this.userLocation,
            restaurantLocation: this.restaurantLocation,
            agentLocation: routePath[this.routeIndex],
            etaSeconds: this.getEtaSeconds(),
            orderStatus: this.currentStatus
        };
    }
    tick() {
        if (this.routeIndex < routePath.length - 1) {
            this.routeIndex += 1;
        }
        const statusChange = statusCheckpoints.find((checkpoint) => checkpoint.routeIndex === this.routeIndex);
        if (statusChange && statusChange.status !== this.currentStatus) {
            this.currentStatus = statusChange.status;
        }
        return {
            location: routePath[this.routeIndex],
            etaSeconds: this.getEtaSeconds(),
            status: statusChange?.status
        };
    }
    getEtaSeconds() {
        const pointsRemaining = routePath.length - 1 - this.routeIndex;
        return pointsRemaining * 120;
    }
}
exports.TrackingEngine = TrackingEngine;
