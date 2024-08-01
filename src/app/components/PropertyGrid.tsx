'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../redux/cartSlice';
import { Button } from 'react-bootstrap';
import { Property } from '../types';
import { toast } from 'react-toastify';

const PropertyGrid: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);

  // Filter and sorting states
  const [filter, setFilter] = useState<{ location?: string, amenities?: string, bedrooms?: number } | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [amenities, setAmenities] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<number | ''>('');

  const properties: Property[] = [
    {
      title: "204 Mount Olive Road Two",
      image: "assets/img/property-1.jpg",
      price: 12000,
      area: 340,
      beds: 2,
      baths: 4,
      amenities: "Pool,Gym",
      location: "New York",
      bedrooms: 2,
      item: undefined,
      description: ''
    },
    {
      title: "205 Mount Olive Road Three",
      image: "assets/img/property-2.jpg",
      price: 15000,
      area: 380,
      beds: 3,
      baths: 5,
      amenities: "Garden",
      location: "New York",
      bedrooms: 3,
      item: undefined,
      description: ''
    },
    {
      title: "206 Mount Olive Road Four",
      image: "assets/img/property-3.jpg",
      price: 18000,
      area: 420,
      beds: 4,
      baths: 6,
      amenities: "Garden, Gym",
      location: "London",
      bedrooms: 2,
      item: undefined,
      description: ''
    },
    {
      title: "207 Mount Olive Road Five",
      image: "assets/img/property-4.jpg",
      price: 20000,
      area: 450,
      beds: 5,
      baths: 7,
      amenities: "Garden, Gym",
      location: "London",
      bedrooms: 2,
      item: undefined,
      description: ''
    },
    {
      title: "208 Mount Olive Road Six",
      image: "assets/img/property-5.jpg",
      price: 22000,
      area: 480,
      beds: 6,
      baths: 8,
      amenities: "Pool,Gym",
      location: "New York",
      bedrooms: 4,
      item: undefined,
      description: ''
    },
    {
      title: "209 Mount Olive Road Seven",
      image: "assets/img/property-6.jpg",
      price: 25000,
      area: 500,
      beds: 7,
      baths: 9,
      amenities: "Pool,Gym",
      location: "Germany",
      bedrooms: 1,
      item: undefined,
      description: ''
    },
  ];

  // Apply filtering and sorting
  const filteredProperties = properties
    .filter(property => {
      if (location && property.location.toLowerCase() !== location.toLowerCase()) return false;
      if (amenities && !property.amenities.toLowerCase().includes(amenities.toLowerCase())) return false;
      if (bedrooms && property.bedrooms < bedrooms) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (property: Property) => {
    dispatch(addToCart(property));
    setNotification("Item added to cart!");
    toast.success("Item added to cart!");
  };

  const handleBuyNow = (item: Property) => {
    const query = new URLSearchParams({
      items: JSON.stringify([item]),
      totalAmount: item.price.toString(),
    }).toString();
    router.push(`/checkout?${query}`);
  };

  const handleClearFilters = () => {
    setLocation('');
    setAmenities('');
    setBedrooms('');
    setFilter(null);
    setSort(null);
  };

  return (
    <section className="property-grid grid">
      <div className="container">
        <div className="row">
          {/* Filter and sorting options */}
          <div className="filters">
            <div className="breadcrumb">
              <span>Filters:</span>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Amenities"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
              <input
                type="number"
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
              />
              <Button onClick={() => setSort('price-asc')}>Sort: Price Low to High</Button>
              <Button onClick={() => setSort('price-desc')}>Sort: Price High to Low</Button>
              <Button onClick={handleClearFilters}>Clear Filters</Button>
            </div>
          </div>

          {/* Property listing */}
          <div className="row">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card-box-a card-shadow">
                    <div className="img-box-a">
                      <img src={property.image} alt="" className="img-a img-fluid" />
                    </div>
                    <div className="card-overlay">
                      <div className="card-overlay-a-content">
                        <div className="card-header-a">
                          <h2 className="card-title-a">
                            <a href="#">{property.title}</a>
                          </h2>
                        </div>
                        <div className="card-body-a">
                          <div className="price-box d-flex">
                            <span className="price-a">rent | ${property.price}</span>
                          </div>
                          <Button onClick={() => handleAddToCart(property)}>Add to Cart</Button>
                          <Button onClick={() => handleBuyNow(property)}>Buy Now</Button>
                        </div>
                        <div className="card-footer-a">
                          <ul className="card-info d-flex justify-content-around">
                            <li><h4 className="card-info-title">Area</h4><span>{property.area}m²</span></li>
                            <li><h4 className="card-info-title">Beds</h4><span>{property.beds}</span></li>
                            <li><h4 className="card-info-title">Baths</h4><span>{property.baths}</span></li>
                            {/* <li><h4 className="card-info-title">Garages</h4><span>{property.garages}</span></li> */}
                            <li><h4 className="card-info-title">Location</h4><span>{property.location}</span></li>
                            <li><h4 className="card-info-title">Amenities</h4><span>{property.amenities}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No items found</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
