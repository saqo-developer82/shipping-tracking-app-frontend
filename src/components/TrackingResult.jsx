import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../components/ui/table"; // adjust path as needed

const TrackingResult = ({ result, error, onClear }) => {
  if (error) {
    return (
      <div className="p-4 border flex justify-center items-center flex-col max-w-xl mx-auto rounded bg-red-100 text-red-700">
        <h3 className="text-lg font-semibold mb-2">Tracking Error</h3>
        <p className="mb-4">{error}</p>
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!result) return null;

  const { data } = result;
  const deliveryDate = new Date(data.estimated_delivery_date);
  const today = new Date();
  const daysUntilDelivery = Math.ceil(
    (deliveryDate - today) / (1000 * 60 * 60 * 24)
  );

  const getDeliveryMessage = () => {
    if (daysUntilDelivery < 0) {
      return `Delivered ${Math.abs(daysUntilDelivery)} days ago`;
    } else if (daysUntilDelivery === 0) {
      return "Estimated delivery today!";
    } else if (daysUntilDelivery === 1) {
      return "Estimated delivery tomorrow";
    } else {
      return `Estimated delivery in ${daysUntilDelivery} days`;
    }
  };

  return (
    <div className="space-y-4 mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Tracking Information</h2>
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm font-medium bg-muted hover:bg-muted/80 border rounded"
        >
          Clear Results
        </button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Carrier</TableHead>
              <TableCell>{data.carrier}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Tracking Code</TableHead>
              <TableCell>{data.tracking_code}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableCell>{data.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Estimated Delivery</TableHead>
              <TableCell>
                {deliveryDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <p className="text-muted-foreground mt-1">
                  {getDeliveryMessage()}
                </p>
              </TableCell>
            </TableRow>
            {(data.origin || data.destination) && (
              <TableRow>
                <TableHead>Route Information</TableHead>
                <TableCell>
                  {data.origin && (
                    <>
                      <span>From {data.origin}</span>
                      {data.destination && <span className="mx-2">→</span>}
                    </>
                  )}
                  {data.destination && <span>{data.destination}</span>}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TrackingResult;
