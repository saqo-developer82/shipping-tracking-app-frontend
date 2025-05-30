export const validateTrackingCode = (code) => {
    if (!code || typeof code !== 'string') {
        return 'Tracking code is required';
    }

    const trimmedCode = code.trim();

    if (trimmedCode.length < 8) {
        return 'Tracking code must be at least 8 characters long';
    }

    if (trimmedCode.length > 20) {
        return 'Tracking code cannot exceed 20 characters';
    }

    if (!/^[A-Z0-9]+$/i.test(trimmedCode)) {
        return 'Tracking code must contain only letters and numbers';
    }

    return null;
};