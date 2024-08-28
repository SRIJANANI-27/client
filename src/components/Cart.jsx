import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Cart = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total price
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
    );
    setCart(updatedCart);
  };

  return (
    <div className="container mt-4">
      {cart.length === 0 ? (
        <h3 className="text-center">Your cart is empty</h3>
      ) : (
        <>
          <h2 className="text-center mb-4">Shopping Cart</h2>
          <div className="row">
            <div className="col-md-8">
              {cart.map(pizza => (
                <div className="card shadow-sm mb-3" key={pizza._id}>
                  <div className="row g-0 align-items-center p-3">
                    <div className="col-md-2">
                      <img
                        src={pizza.image}
                        alt={pizza.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{pizza.name}</h5>
                        <p className="card-text mb-1">
                          Variant: <strong>{pizza.variant}</strong>
                        </p>
                        <p className="card-text mb-1 d-flex align-items-center">
                          Quantity:
                          <button
                            className="btn btn-sm btn-outline-secondary mx-2"
                            onClick={() => updateQuantity(pizza._id, -1)}
                            disabled={pizza.quantity <= 1}
                          >
                            -
                          </button>
                          <strong>{pizza.quantity}</strong>
                          <button
                            className="btn btn-sm btn-outline-secondary mx-2"
                            onClick={() => updateQuantity(pizza._id, 1)}
                          >
                            +
                          </button>
                        </p>
                        <p className="card-text">
                          Price: <strong>Rs.{pizza.price * pizza.quantity}</strong>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeItem(pizza._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm text-end">
                <h3>Total Amount: Rs.{total.toFixed(2)}</h3>
                <button className="btn btn-success mt-3 w-100">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
