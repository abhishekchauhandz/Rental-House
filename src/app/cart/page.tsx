'use client'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Correct path to your store file
import { clearCart, removeFromCart } from '../redux/cartSlice';
import { Button } from 'react-bootstrap';
import { Property } from '../types'; // Adjust the path to your Property type
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleBuyNow = (item: Property) => {
    const query = new URLSearchParams({
      items: JSON.stringify([item]),
      totalAmount: item.price.toString(),
    }).toString();
    router.push(`/checkout?${query}`);
  };

  const handleDeleteItem = (item: Property) => {
    dispatch(removeFromCart(item));
  };

  const handleBuyAll = () => {
    const query = new URLSearchParams({
      items: JSON.stringify(cartItems),
      totalAmount: totalAmount.toString(),
    }).toString();
    router.push(`/checkout?${query}`);
  };

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link href="/" className="btn btn-primary">Back to Home</Link>
        <Button variant="danger" onClick={handleClearCart}>Clear Cart</Button>
      </div>
      <h1 className="mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items found in your cart.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item: Property, index: number) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={item.image} alt={item.title} width="100" className="mr-3"/>
                <div>
                  <h2 className="h5">{item.title}</h2>
                  <p>${item.price}</p>
                </div>
              </div>
              <div className="d-flex">
                <Button className="btn btn-success mr-2" onClick={() => handleBuyNow(item)}>
                  <FaShoppingCart /> Buy Now
                </Button>
                <Button className="btn btn-danger" onClick={() => handleDeleteItem(item)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <h3>Total Amount: ${totalAmount}</h3>
          <Button className="btn btn-success mt-2" onClick={handleBuyAll}>
            <FaShoppingCart /> Buy All
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
