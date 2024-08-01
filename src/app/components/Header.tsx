// src/app/components/Header.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <header>
      <nav className='d-flex justify-content-around align-items-center'>
        <h1 className='headerHeading'>My Rental Platform</h1>
        {isClient && <Link href="/cart">
          <Button onClick={handleCartClick}>
          <FaShoppingCart /> Cart ({cart.length})
          </Button>
        </Link>}
      </nav>
    </header>
  );
};

export default Header;
