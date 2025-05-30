import React, { useState } from 'react';
import { validateTrackingCode } from '../utils/validation';
const TrackingForm = ({ onSubmit, loading }) => {
    const [trackingCode, setTrackingCode] = useState('');
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="tracking-code"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Tracking Code
                    </label>
                    <div className="flex gap-3">
                        <input
                            id="tracking-code"
                            type="text"
                            value={trackingCode}
                            onChange={handleInputChange}
                            placeholder="Enter tracking code (e.g., TRK123456789)"
                            className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bl validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                            disabled={loading}
                            maxLength={20}
                        />
                        <button
                            type="submit"
                            disabled={loading || !trackingCode.trim()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            {loading ? (
                               <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="current" strokeWidth="4"></circle>
                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018"></path>
                                    </svg>
                                    Tracking...
                                </span>
                               ) : (
                                 'Track Package'
                               )}
                        </button>
                    </div>

                    {validationError && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1"></path>
                            </svg>
                            {validationError}
                        </p>
                    )}
                </div>

                <div className="text-sm text-gray-500">
                    <p> Try these sample tracking codes:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {['TRK123456789', 'TRK987654321', 'TRK456789123'].map(code => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setTrackingCode(code)}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
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