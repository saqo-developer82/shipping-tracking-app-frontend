import { useState } from "react";
import { toast } from "sonner";
import apiService from "../services/api";

export const useTracking = () => {
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingCode, setTrackingCode] = useState("");

  const trackPackage = async (trackingCode) => {
    if (!trackingCode?.trim()) {
      toast.error("Please enter a tracking code");
      return;
    }

    setLoading(true);
    setTrackingResult(null);

    try {
      const result = await apiService.trackPackage(
        trackingCode.trim().toUpperCase()
      );
      setTrackingResult(result);
    } catch (err) {
      toast.error(err?.message || "Failed to track package");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTrackingCode("");
    setTrackingResult(null);
  };

  return {
    loading,
    trackingResult,
    trackPackage,
    clearResults,
    setTrackingCode,
    trackingCode,
  };
};
