import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaImage, FaTimes } from 'react-icons/fa';

export default function ProductForm({ onSubmit, initialData = null, onCancel }) {
  const initialFormState = {
    image: '',
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    status: 'available',
    featured: false
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    setFormData(initialData || initialFormState);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };
    
    onSubmit(productData);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    onCancel();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4 newprd">
          {initialData ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="image-preview-section mb-4">
            <div className="text-center mb-3">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Vista previa"
                  className="img-thumbnail bg-dark"
                  style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div className="image-placeholder">
                  <FaImage size={48} className="text-muted" />
                  <p className="text-muted mt-2">Vista previa de la imagen</p>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaImage className="me-2" />
                URL de la Imagen
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-control"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre del Producto</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Ej: Camisa Casual"
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Precio</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min="0"
                  step="0.01"
                  placeholder="29.99"
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Ej: Ropa"
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-control"
                required
                min="0"
                placeholder="100"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Estado del Producto</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="available">Disponible</option>
                <option value="outOfStock">Agotado</option>
              </select>
            </div>

            <div className="col-md-6">
              <div className="h-100 d-flex align-items-center">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="form-check-input"
                    id="featuredCheck"
                    role="switch"
                  />
                  <label className="form-check-label" htmlFor="featuredCheck">
                    Producto Destacado
                  </label>
                </div>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
                rows="3"
                placeholder="Describe el producto..."
              />
            </div>
          </div>
          
          <div className="mt-4 d-flex gap-2">
            <button 
              type="submit" 
              className={`btn flex-grow-1 ${initialData ? 'btn-primary' : 'btn-success'}`}
            >
              {initialData ? (
                <>
                  <FaSave className="me-2" /> Guardar Cambios
                </>
              ) : (
                <>
                  <FaPlus className="me-2" /> Agregar Producto
                </>
              )}
            </button>
            {initialData && (
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                <FaTimes className="me-2" /> Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}