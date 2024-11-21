import { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 999) + 1;
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: p.id } : p
      ));
      setEditingProduct(null);
    } else {
      const newProduct = {
        ...productData,
        id: generateRandomId()
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    document.querySelector('.product-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-vh-100 py-4">
      <div className="container">
        <h1 className="text-center mb-4 fw-bold">
          Sistema de Gestión de Productos
        </h1>
        
        <div className="row mb-4">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="input-group shadow-sm">
              <span className="input-group-text border-end-0">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por nombre o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="product-form sticky-top" style={{ top: '1rem' }}>
              <ProductForm 
                onSubmit={handleSubmit}
                initialData={editingProduct}
                onCancel={() => setEditingProduct(null)}
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;