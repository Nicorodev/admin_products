import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

export default function ProductList({ products = [], onEdit, onDelete, searchTerm = '' }) {
  // Validación y manejo del caso en que no haya productos
  const filteredProducts = Array.isArray(products)
    ? products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id?.toString().includes(searchTerm.toLowerCase())
      )
    : [];

  // Mensaje si no hay productos tras filtrar
  if (filteredProducts.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <p className="text-muted">
            {searchTerm 
              ? 'No se encontraron productos que coincidan con la búsqueda.'
              : 'No hay productos registrados.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Destacado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    ) : (
                      <div
                        className="bg-light rounded d-flex align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px' }}
                      >
                        <span className="text-muted">N/A</span>
                      </div>
                    )}
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price?.toFixed(2)}</td>
                  <td>{product.category || 'Sin categoría'}</td>
                  <td>{product.stock ?? '0'}</td>
                  <td>
                    <span className={`badge ${product.status === 'available' ? 'bg-success' : 'bg-danger'}`}>
                      {product.status === 'available' ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                  <td>
                    {product.featured && (
                      <FaStar className="text-warning" title="Producto Destacado" />
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="btn btn-sm btn-primary"
                        title="Editar producto"
                      >
                        <FaEdit className="me-1" /> Editar
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="btn btn-sm btn-danger"
                        title="Eliminar producto"
                      >
                        <FaTrash className="me-1" /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
