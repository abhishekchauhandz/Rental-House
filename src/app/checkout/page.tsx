'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice'; // Adjust path as necessary
import { Property } from '../types'; // Adjust path as necessary

const Checkout: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartItems, setCartItems] = useState<Property[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const items = JSON.parse(searchParams.get('items') || '[]');
    const amount = parseFloat(searchParams.get('totalAmount') || '0');
    setCartItems(items);
    setTotalAmount(amount);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission here

    // Redirect to Thank You page with booking details
    const query = new URLSearchParams({
      items: JSON.stringify(cartItems),
      totalAmount: totalAmount.toString(),
      name: name,
      address: address,
      completeAddress: completeAddress,
      mobileNumber: mobileNumber,
      email: email,
      paymentMethod: paymentMethod,
    }).toString();

    // Remove purchased items from the cart
    cartItems.forEach(item => {
      dispatch(removeFromCart(item));
    });

    router.push(`/thankyou?${query}`);
  };

  const isFormValid = () => {
    return name && address && completeAddress && mobileNumber && email && paymentMethod;
  };

  return (
    <div className="container p-4">
      <Button onClick={() => router.push('/')} className="mb-3">Back to Home</Button>
      <h1>Checkout</h1>
      {cartItems.length > 0 && (
        <div className="property-details mb-4">
          <div className='d-flex justify-content-evenly'>
          {cartItems.map((item, index) => (
            <div key={index} className="mb-3">
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
              <img src={item.image} alt={item.title} width="100" />
            </div>
          ))}
          </div>
          <h3>Total Amount: ${totalAmount}</h3>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="completeAddress">Complete Address</label>
          <input
            type="text"
            className="form-control"
            id="completeAddress"
            value={completeAddress}
            onChange={(e) => setCompleteAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <input
            type="text"
            className="form-control"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-3" disabled={!isFormValid()}>Place Order</Button>
      </form>
    </div>
  );
};

export default Checkout;
