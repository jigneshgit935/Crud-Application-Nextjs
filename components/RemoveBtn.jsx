'use client';

import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RemoveBtn({ id }) {
  const showToastMessage = () => {
    toast.success('Product Deleted!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'fontsie',
    });
  };
  const router = useRouter();
  const deleteProduct = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToastMessage();
        router.refresh();
      }
    }
  };
  return (
    <>
      <ToastContainer hideProgressBar={true} pauseOnHover={false} />

      <button onClick={deleteProduct} className="linkdesignDelete">
        Delete
      </button>
    </>
  );
}
