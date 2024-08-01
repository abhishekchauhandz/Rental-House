'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'react-bootstrap';

const ThankYou: React.FC = () => {
    const [bookingDetails, setBookingDetails] = useState({
        items: [],
        totalAmount: 0,
        date: '',
        time: '',
        name: '',
        address: '',
        paymentMethod: '',
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if searchParams is available before using it
        if (searchParams) {
            const items = JSON.parse(searchParams.get('items') || '[]');
            const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
            const name = searchParams.get('name') || '';
            const address = searchParams.get('address') || '';
            const paymentMethod = searchParams.get('paymentMethod') || '';
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();

            setBookingDetails({
                items,
                totalAmount,
                date,
                time,
                name,
                address,
                paymentMethod,
            });
        }
    }, [searchParams]);

    return (
        <div className='p-4'>
            <Button onClick={() => router.push('/')} className="mb-3">Back to Home</Button>
            <div className="container p-4 text-center">
                <h1 className='headerHeading'>Thank You!</h1>
                <div className='d-flex justify-content-evenly align-items-center'>
                    <div>
                        <p>Your property booking is confirmed.</p>
                        <h3>Booking Details:</h3>
                        <p>Date: {bookingDetails.date}</p>
                        <p>Time: {bookingDetails.time}</p>
                        <p>Name: {bookingDetails.name}</p>
                        <p>Address: {bookingDetails.address}</p>
                        <p>Payment Method: {bookingDetails.paymentMethod}</p>
                    </div>
                    <div>
                        <h4>Items Booked:</h4>
                        <ul>
                            {bookingDetails.items.map((item: any, index: number) => (
                                <li key={index}>
                                    <h5>{item.title}</h5>
                                    <p>Price: ${item.price}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <h3 className='text-center'>Total Amount: ${bookingDetails.totalAmount}</h3>
        </div>
    );
};

export default ThankYou;
