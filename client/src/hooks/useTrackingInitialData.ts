import { useQuery } from "@tanstack/react-query";
import { TrackingState } from "../types/tracking";

const API_URL = import.meta.env.VITE_API_URL ?? "/api/tracking/initial";

const fetchInitialData = async (): Promise<TrackingState> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch initial tracking data");
  }
  return response.json() as Promise<TrackingState>;
};

export const useTrackingInitialData = () =>
  useQuery({
    queryKey: ["initial-tracking"],
    queryFn: fetchInitialData,
    retry: 2
  });
