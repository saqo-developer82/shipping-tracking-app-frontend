const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

class ApiService {
    async trackPackage(trackingCode) {
        try {
            const response = await fetch(`${API_BASE_URL}/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ tracking_code: trackingCode }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to track package');
            }
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            return null;
        }
    }
}
export default new ApiService();