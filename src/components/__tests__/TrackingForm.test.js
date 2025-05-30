// src/components/__tests__/TrackingForm.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrackingForm from '../TrackingForm';

describe('TrackingForm', () => {
    test('renders tracking form with input and button', () => {
        render(<TrackingForm onSubmit={jest.fn()} loading={false} />);

        expect(screen.getByLabelText(/tracking code/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /track package/i })).toBeInTheDocument();
    });

    test('validates tracking code before submission', async () => {
        const onSubmit = jest.fn();
        render(<TrackingForm onSubmit={onSubmit} loading={false} />);

        const input = screen.getByLabelText(/tracking code/i);
        const button = screen.getByRole('button', { name: /track package/i });

        fireEvent.change(input, { target: { value: 'short' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/must be at least 8 characters/i)).toBeInTheDocument();
        });

        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('submits form with valid tracking code', async () => {
        const onSubmit = jest.fn();
        render(<TrackingForm onSubmit={onSubmit} loading={false} />);

        const input = screen.getByLabelText(/tracking code/i);
        const button = screen.getByRole('button', { name: /track package/i });

        fireEvent.change(input, { target: { value: 'TRK123456789' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith('TRK123456789');
        });
    });
});