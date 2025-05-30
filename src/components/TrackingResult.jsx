import React from 'react';
const TrackingResult = ({ result, error, onClear }) => {
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                    <div>
                        <h3 className="text-lg font-medium text-red-800">Tracking Error</h3>
                        <p className="text-red-700 mt-1">{error}</p>
                        <button
                            onClick={onClear}
                            className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) {
        return null;
    }

    const {data} = result;
    const deliveryDate = new Date(data.estimated_delivery_date);
    const today = new Date();
    const daysUntilDelivery = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24));

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'text-green-600 bg-green-100';
            case 'in transit':
                return 'text-blue-600 bg-blue-100';
            case 'processing':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getDeliveryMessage = () => {
        if (daysUntilDelivery < 0) {
            return `Delivered ${Math.abs(daysUntilDelivery)} days ago`;
        } else if (daysUntilDelivery === 0) {
            return 'Estimated delivery today!';
        } else if (daysUntilDelivery === 1) {
            return 'Estimated delivery tomorrow';
        } else {
            return `Estimated delivery in ${daysUntilDelivery} days`;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Tracking Information</h2>
                <button
                    onClick={onClear}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Clear Results
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Tracking Code</label>
                        <p className="text-lg font-mono bg-gray-50 px-3 py-2 rounded">{data.tracking_code}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                        <p className="text-lg font-mono bg-gray-50 px-3 py-2 rounded">{data.status}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Carrier</label>
                        <p className="text-lg text-gray-900">{data.carrier}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Estimated Delivery Date</label>
                        <p className="text-2xl font-bold text-blue-600">
                            {deliveryDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{getDeliveryMessage()}</p>
                    </div>
                    {(data.origin || data.destination) && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-2">Route Information</h4>
                            <div className="flex items-center text-sm text-gray-600">
                                {data.origin && (
                                    <>
                                        <span> {data.origin}</span>
                                        {data.destination && <span className="mx-2">→</span>}
                                    </>
                                )}
                                {data.destination && <span> {data.destination}</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackingResult;