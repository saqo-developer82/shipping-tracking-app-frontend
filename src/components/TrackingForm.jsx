import React, { useState } from "react";
import { validateTrackingCode } from "../utils/validation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const sampleCodes = ["TRK123456789", "TRK567325339", "TRK481003676"];

const TrackingForm = ({ onSubmit, loading, trackingCode, setTrackingCode }) => {
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateTrackingCode(trackingCode);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError("");
    onSubmit(trackingCode);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setTrackingCode(value);

    if (validationError) {
      setValidationError("");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto border rounded-lg p-6 space-y-6 shadow-sm bg-background">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="tracking-code"
            className="block text-sm font-medium text-foreground"
          >
            Tracking Code
          </label>

          <div className="flex gap-2">
            <Input
              id="tracking-code"
              type="text"
              value={trackingCode}
              onChange={handleInputChange}
              placeholder="e.g., TRK123456789"
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !trackingCode?.trim()}>
              {loading ? "Tracking..." : "Get Tracking Info"}
            </Button>
          </div>

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Tracking code must be at least 8 characters long
          </p>
          <p className="text-sm text-muted-foreground">
            Tracking code cannot exceed 20 characters
          </p>
          <p className="text-sm text-muted-foreground">
            Tracking code must contain only letters and numbers
          </p>
          <p className="text-sm text-muted-foreground">
            Try these sample tracking codes:
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleCodes.map((code) => (
              <Button
                key={code}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTrackingCode(code)}
                disabled={loading}
              >
                {code}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TrackingForm;
