import { motion } from "framer-motion";
import { useEffect } from "react";
import { DeliveryInfoCard } from "../components/DeliveryInfoCard";
import { ETATimer } from "../components/ETATimer";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { MapView } from "../components/MapView";
import { OrderTimeline } from "../components/OrderTimeline";
import { useTrackingInitialData } from "../hooks/useTrackingInitialData";
import { useSmoothAgentLocation } from "../hooks/useSmoothAgentLocation";
import { useTrackingSocket } from "../hooks/useTrackingSocket";
import { useTrackingStore } from "../store/trackingStore";

export const TrackingPage = () => {
  const { isLoading, isError, data, error, refetch } = useTrackingInitialData();
  const {
    userLocation,
    restaurantLocation,
    agentLocation,
    etaSeconds,
    orderStatus,
    isConnected,
    setInitialData
  } = useTrackingStore();

  useTrackingSocket();

  useEffect(() => {
    if (data) {
      setInitialData(data);
    }
  }, [data, setInitialData]);

  const smoothAgentLocation = useSmoothAgentLocation(agentLocation);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <LoadingSkeleton />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-rose-700">Unable to load tracking</h2>
          <p className="mt-2 text-sm text-rose-600">
            {(error as Error | undefined)?.message ?? "Please try again"}
          </p>
          <button
            className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Live Delivery Tracking</h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time location updates for your active order.
        </p>
      </motion.div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <MapView
          userLocation={userLocation}
          restaurantLocation={restaurantLocation}
          agentLocation={smoothAgentLocation}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <ETATimer etaSeconds={etaSeconds} />
          <DeliveryInfoCard status={orderStatus} isConnected={isConnected} />
          <OrderTimeline currentStatus={orderStatus} />
        </div>
      </div>
    </main>
  );
};
