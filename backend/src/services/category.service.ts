import { categoryRepository } from '../repositories/category.repository';

export const categoryService = {
  async listCategories() {
    return categoryRepository.getAll();
  },

  async getCategory(id: number) {
    const category = await categoryRepository.getById(id);
    if (!category) throw new Error('Categoría no encontrada');
    return category;
  },

  async createCategory(data: { name: string; description?: string }) {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }
    if (data.description && data.description.length > 500) {
      throw new Error('La descripción no puede exceder 500 caracteres');
    }
    return categoryRepository.create(data.name, data.description);
  },

  async updateCategory(id: number, data: { name: string; description?: string }) {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }
    return categoryRepository.update(id, data.name, data.description);
  },

  async deleteCategory(id: number) {
    return categoryRepository.delete(id);
  }
};