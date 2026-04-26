import { useEffect, useRef, useState } from "react";
import { LatLng } from "../types/tracking";

const interpolate = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

export const useSmoothAgentLocation = (target: LatLng, durationMs = 1800) => {
  const [display, setDisplay] = useState<LatLng>(target);
  const previous = useRef(target);

  useEffect(() => {
    const start = performance.now();
    const from = previous.current;
    let frameId = 0;

    const frame = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay({
        lat: interpolate(from.lat, target.lat, progress),
        lng: interpolate(from.lng, target.lng, progress)
      });
      if (progress < 1) {
        frameId = requestAnimationFrame(frame);
      }
    };

    frameId = requestAnimationFrame(frame);
    previous.current = target;

    return () => cancelAnimationFrame(frameId);
  }, [durationMs, target]);

  return display;
};
