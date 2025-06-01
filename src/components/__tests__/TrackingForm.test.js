import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrackingForm from '../TrackingForm';

describe('TrackingForm', () => {
    const mockSetTrackingCode = jest.fn();
    const mockOnSubmit = jest.fn();

    test('renders tracking form with input and bgit utton', () => {
        render(<TrackingForm
            onSubmit={mockOnSubmit}
            loading={false}
            trackingCode=""
            setTrackingCode={mockSetTrackingCode}
        />);

        expect(screen.getByLabelText(/tracking code/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /get tracking info/i })).toBeInTheDocument();
    });

    test('validates tracking code before submission', async () => {
        const onSubmit = jest.fn();
        render(<TrackingForm
            onSubmit={mockOnSubmit}
            loading={false}
            trackingCode=""
            setTrackingCode={mockSetTrackingCode}
        />);

        const input = screen.getByLabelText(/tracking code/i);
        const button = screen.getByRole('button', { name: /get tracking info/i });

        fireEvent.change(input, { target: { value: 'short' } });
        fireEvent.click(button);

        expect(mockOnSubmit).not.toHaveBeenCalled();

        await waitFor(() => {
            expect(screen.getByText(/tracking code must be at least 8 characters long/i)).toBeInTheDocument();
        });
    });

  test('submits form with valid tracking code', async () => {
    const onSubmit = jest.fn();

    const Wrapper = () => {
        const [trackingCode, setTrackingCode] = React.useState('');
        return (
            <TrackingForm
                onSubmit={onSubmit}
                loading={false}
                trackingCode={trackingCode}
                setTrackingCode={setTrackingCode}
            />
        );
    };

    render(<Wrapper />);

    const input = screen.getByLabelText(/tracking code/i);
    const button = screen.getByRole('button', { name: /get tracking info/i });

    fireEvent.change(input, { target: { value: 'TRK123456789' } });
    fireEvent.click(button);

    await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith('TRK123456789');
    });
});

});