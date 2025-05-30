import { useState } from 'react';
import apiService from '../services/api';

export const useTracking = () => {
    const [loading, setLoading] = useState(false);
    const [trackingResult, setTrackingResult] = useState(null);
    const [error, setError] = useState(null);
    const trackPackage = async (trackingCode) => {
        if (!trackingCode?.trim()) {
            setError('Please enter a tracking code');
            return;
        }
        setLoading(true);
        setError(null);
        setTrackingResult(null);
        try {
            const result = await apiService.trackPackage(trackingCode.trim().toUpperCase());
            setTrackingResult(result);
        } catch (err) {
            setError(err.message || 'Failed to track package');
        } finally {
            setLoading(false);
        }
    };
    const clearResults = () => {
        setTrackingResult(null);
        setError(null);
    };

    return {
        loading,
        trackingResult,
        error,
        trackPackage,
        clearResults,
    };
};