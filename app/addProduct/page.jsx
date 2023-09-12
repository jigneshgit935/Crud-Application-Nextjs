'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const showToastMessage = () => {
    toast.success('Product Created ', {
      position: toast.POSITION.TOP_CENTER,
      className: 'fontsie',
    });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !color || !company || !category) {
      alert('All Fields are required');
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, price, color, company, category }),
      });

      if (res.ok) {
        showToastMessage();
        router.push('/');
        router.refresh();
      } else {
        alert('Something went wrong');
      }
    } catch (error) {}
  };
  return (
    <div className="bgMain">
      <ToastContainer hideProgressBar={true} pauseOnHover={false} />
      <div className="inputMain">
        <Link className="linkdesign" href="/">
          Go Back
        </Link>
        <h3 className="heading">Add Products</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Name"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Price"
        />
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Color"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Company"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Category"
        />
        <button onClick={handleSubmit} type="submit" className="buttonStyle">
          Add Product
        </button>
      </div>
    </div>
  );
}
