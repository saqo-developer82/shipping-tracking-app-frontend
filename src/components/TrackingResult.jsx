import React from 'react';

const TrackingResult = ({ result, error, onClear }) => {
    if (error) {
        return (
            <div>
                <div>
                    <div>
                        <h3>Tracking Error</h3>
                        <p>{error}</p>
                        <button
                            onClick={onClear}
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

    const { data } = result;
    const deliveryDate = new Date(data.estimated_delivery_date);
    const today = new Date();
    const daysUntilDelivery = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24));


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
        <div>
            <div>
                <h2>Tracking Information</h2>
                <button onClick={onClear}>Clear Results</button>
            </div>

            <div>
                <div>
                    <table border={1}>
                        <tbody>
                            <tr>
                                <th>Carrier</th>
                                <td>{data.carrier}</td>
                            </tr>
                            <tr>
                                <th>Tracking Code</th>
                                <td>{data.tracking_code}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{data.status}</td>
                            </tr>
                            <tr>
                                <th>Estimated Delivery</th>
                                <td>
                                    {deliveryDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    <p>
                                        {getDeliveryMessage()}
                                    </p>
                                </td>
                            </tr>
                            {(data.origin || data.destination) && (
                                <tr>
                                    <th>Route Information</th>
                                    <td>
                                        {data.origin && (
                                            <>
                                                <span>From {data.origin}</span>
                                                {data.destination && <span className="mx-2"> To </span>}
                                            </>
                                        )}
                                        {data.destination && <span>{data.destination}</span>}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrackingResult;