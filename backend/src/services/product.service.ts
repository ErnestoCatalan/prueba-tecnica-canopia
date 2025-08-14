import { productRepository } from '../repositories/product.repository';

export const productService = {
  async listProducts() {
    return productRepository.getAll();
  },

  async getProduct(id: number) {
    const product = await productRepository.getById(id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  },

  async createProduct(data: { name: string; description: string; price: number; stock: number; category_id?: number }) {
    // Validaciones de nombre
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }
    if (data.name.length > 100) {
      throw new Error('El nombre no puede exceder 100 caracteres');
    }

    // Validaciones de descripción
    if (data.description && data.description.length > 500) {
      throw new Error('La descripción no puede exceder 500 caracteres');
    }

    // Validaciones de precio y stock
    if (data.price <= 0) throw new Error('El precio debe ser mayor que 0');
    if (data.stock < 0) throw new Error('El stock no puede ser negativo');
    if (!Number.isInteger(data.stock)) throw new Error('El stock debe ser un número entero');

    // Validación de categoría si se proporciona
    if (data.category_id && data.category_id <= 0) {
      throw new Error('ID de categoría inválido');
    }

    return productRepository.create(data.name, data.description, data.price, data.stock, data.category_id);
  },

  async updateProduct(id: number, data: { name: string; description: string; price: number; stock: number; category_id?: number }) {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }
    if (data.name.length > 100) {
      throw new Error('El nombre no puede exceder 100 caracteres');
    }
    if (data.description && data.description.length > 500) {
      throw new Error('La descripción no puede exceder 500 caracteres');
    }
    if (data.price <= 0) throw new Error('El precio debe ser mayor que 0');
    if (data.stock < 0) throw new Error('El stock no puede ser negativo');
    if (!Number.isInteger(data.stock)) throw new Error('El stock debe ser un número entero');
    if (data.category_id && data.category_id <= 0) {
      throw new Error('ID de categoría inválido');
    }
    return productRepository.update(id, data.name, data.description, data.price, data.stock, data.category_id);
  },

  async deleteProduct(id: number) {
    return productRepository.delete(id);
  }
};
