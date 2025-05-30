import React, { useState } from 'react';
import { validateTrackingCode } from '../utils/validation';

const TrackingForm = ({ onSubmit, loading,trackingCode, setTrackingCode }) => {
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const error = validateTrackingCode(trackingCode);
        if (error) {
            setValidationError(error);
            return;
        }

        setValidationError('');
        onSubmit(trackingCode);
    };

    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase();
        setTrackingCode(value);

        if (validationError) {
            setValidationError('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="tracking-code"
                    >
                        Tracking Code
                    </label>
                    <div>
                        <input
                            id="tracking-code"
                            type="text"
                            value={trackingCode}
                            onChange={handleInputChange}
                            placeholder="Enter tracking code (e.g., TRK123456789)"
                            disabled={loading}
                            maxLength={20}
                        />
                        <button
                            type="submit"
                            disabled={loading || !trackingCode.trim()}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    Tracking...
                                </span>
                            ) : (
                                'Get Tracking Info'
                            )}
                        </button>
                    </div>

                    {validationError && (
                        <p>
                            {validationError}
                        </p>
                    )}
                </div>

                <div>
                    <p>Try these sample tracking codes:</p>
                    <div>
                        {['TRK123456789', 'TRK567325339', 'TRK481003676'].map(code => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setTrackingCode(code)}
                                disabled={loading}
                            >
                                {code}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TrackingForm;