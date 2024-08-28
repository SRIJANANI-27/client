import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pizza from '../components/Pizza';
import Spinner from '../components/Load';
import { motion } from 'framer-motion';

const container = (delay) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: delay },
  },
});

function Home({ handleclick }) {
  const [loading, setLoading] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4000/pizza')
      .then((res) => {
        setPizzas(res.data.pizza);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="row justify-content-center align-items-center g-2">
        {loading ? (
          <Spinner />
        ) : (
          pizzas.map((pizza, index) => (
            <motion.div
              className="col-md-4 mb-4"
              key={pizza._id}
              variants={container(index * 0.1)} // Apply staggered delay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% of the element is in view
            >
              <Pizza pizza={pizza} handleclick={handleclick} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
