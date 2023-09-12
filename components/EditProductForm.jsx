'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../app/addProduct/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProductForm({
  id,
  name,
  price,
  color,
  company,
  category,
}) {
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newColor, setNewColor] = useState(color);
  const [newCompany, setNewCompany] = useState(company);
  const [newCategory, setNewCategory] = useState(category);
  const showToastMessage = () => {
    toast.success('Product Updated!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'fontsie',
    });
  };
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          newName,
          newPrice,
          newColor,
          newCompany,
          newCategory,
        }),
      });

      if (!res.ok) {
        alert('Failed to update product');
      }

        showToastMessage();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bgMain">
      <ToastContainer hideProgressBar={true} pauseOnHover={false} />
      <div className="inputMain">
        <Link className="linkdesign" href="/">
          Go Back
        </Link>
        <h3 className="heading">Edit Products</h3>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Name"
        />
        <input
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Price"
        />
        <input
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Color"
        />
        <input
          value={newCompany}
          onChange={(e) => setNewCompany(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Company"
        />
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="inputStyle"
          type="text"
          placeholder="Enter Product Category"
        />

        <button onClick={handleUpdate} className="buttonStyle">
          Edit Product
        </button>
      </div>
    </div>
  );
}
