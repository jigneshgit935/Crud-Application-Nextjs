import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';

const getProducts = async () => {
  const apiUrl = process.env.API_URL;

  try {
    const res = await fetch(`${apiUrl}/api/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading products: ', error);
  }
};

export default async function ProductsList() {
  const { products } = await getProducts();

  return (
    <main>
      <div className="productMainPage">
        <div className="alignheadandlink">
          <h2>Product List</h2>

          <Link className="linkdesign" href="/addProduct">
            Add Products
          </Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Company</th>
                <th>Category</th>
                <th>Edit</th>
              </tr>
            </thead>
            {products.map((p) => (
              <tbody key={p._id}>
                <tr>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.color}</td>
                  <td>{p.company}</td>
                  <td>{p.category}</td>
                  <td>
                    <RemoveBtn id={p._id} />
                    <Link href={`/editProduct/${p._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </main>
  );
}
