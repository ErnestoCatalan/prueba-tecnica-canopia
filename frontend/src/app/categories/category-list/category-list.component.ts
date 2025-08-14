import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../models/category.model';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    RouterModule
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  displayDialog = false;
  loading = false;
  formTouched = false;

  newCategory: Partial<Category> = {
    name: '',
    description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.categories = response;
        } else if (response && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          console.warn('Formato de respuesta inesperado:', response);
          this.categories = [];
        }
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.categories = [];
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar categorías'
        });
      },
      complete: () => this.loading = false
    });
  }

  showDialogToAdd() {
    this.selectedCategory = null;
    this.newCategory = { name: '', description: '' };
    this.formTouched = false;
    this.displayDialog = true;
  }

  editCategory(category: Category) {
    this.selectedCategory = category;
    this.newCategory = { ...category };
    this.formTouched = false;
    this.displayDialog = true;
  }

  onSave() {
    this.formTouched = true;
    if (!this.validateCategory()) return;

    const operation = this.selectedCategory
      ? this.categoryService.updateCategory(this.selectedCategory.id, this.newCategory)
      : this.categoryService.createCategory(this.newCategory as Omit<Category, 'id'>);

    operation.subscribe({
      next: () => {
        this.loadCategories();
        this.displayDialog = false;
        this.showSuccess(`Categoría ${this.selectedCategory ? 'actualizada' : 'creada'}`);
      },
      error: (err) => this.showError(err.error?.message || 'Error al guardar categoría')
    });
  }

  onCancel() {
    this.displayDialog = false;
    this.formTouched = false;
  }

  isFormValid(): boolean {
    return !!this.newCategory.name && this.newCategory.name.length >= 3 &&
           !!this.newCategory.description && this.newCategory.description.length >= 10;
  }

  private validateCategory(): boolean {
    let isValid = true;

    // Validar nombre
    if (!this.newCategory.name || this.newCategory.name.trim().length < 3) {
      this.showError('El nombre es requerido y debe tener al menos 3 caracteres');
      isValid = false;
    }

    // Validar descripción
    if (!this.newCategory.description || this.newCategory.description.trim().length < 10) {
      this.showError('La descripción es requerida y debe tener al menos 10 caracteres');
      isValid = false;
    }

    return isValid;
  }

  confirmDelete(categoryId: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar esta categoría?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteCategory(categoryId)
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();
        this.showSuccess('Categoría eliminada');
      },
      error: (err) => this.showError('Error al eliminar categoría')
    });
  }

  private showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message
    });
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
