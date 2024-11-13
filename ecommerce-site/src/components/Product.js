import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import {Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded" style={{ width: '18rem', height: '25rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image} 
          style={{ height: '150px', objectFit: 'cover' }} 
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="text-truncate">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
