import React, { useState } from "react";
import { Modal } from 'react-bootstrap';

function Pizza({ pizza, handleclick }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(pizza.varients[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCart = () => {
    const price = pizza.prices[0][variant] * quantity;
    const cartItem = { ...pizza, variant, quantity, price };

    // Call the handler function if needed
    handleclick(cartItem);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card shadow-lg mb-5" style={{ width: '17rem' }}>
        <img
          src={pizza.image}
          className="card-img-top"
          style={{ height: "150px", objectFit: "cover", cursor: 'pointer' }}
          alt={pizza.name}
          onClick={handleShow}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{pizza.name}</h5>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mb-1">Variants</p>
              <select
                className="form-select form-select-sm"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
              >
                {pizza.varients.map((varnt) => (
                  <option key={varnt} value={varnt}>
                    {varnt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Quantity</p>
              <select
                className="form-select form-select-sm"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6 className="fw-bold mb-0">Price: ${pizza.prices[0][variant] * quantity}</h6>
            <button className="btn btn-sm btn-danger" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={pizza.image} style={{ height: '250px', width: '250px' }} className="rounded" alt={pizza.name} />
          <p className="mt-3">{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-danger" onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pizza;
