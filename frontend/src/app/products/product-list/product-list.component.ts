import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product.model';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../models/category.model';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    SelectButtonModule,
    InputNumberModule,
    ConfirmDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ConfirmationService]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedProduct: Product | null = null;
  displayDialog = false;
  loading = false;
  formSubmitted = false;

  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: undefined
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = Array.isArray(response) ? response : [];
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.products = [];
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos'
        });
      },
      complete: () => this.loading = false
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = Array.isArray(response) ? response : [];
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.categories = [];
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías'
        });
      }
    });
  }

  getCategoryName(categoryId?: number): string {
    if (!categoryId) return 'Sin categoría';
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Categoría desconocida';
  }

  showDialogToAdd() {
    this.selectedProduct = null;
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_id: undefined
    };
    this.formSubmitted = false;
    this.displayDialog = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.newProduct = { ...product };
    this.formSubmitted = false;
    this.displayDialog = true;
  }

  saveProduct() {
    this.formSubmitted = true;

    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos correctamente'
      });
      return;
    }

    const operation = this.selectedProduct
      ? this.productService.updateProduct(this.selectedProduct.id, this.newProduct)
      : this.productService.createProduct(this.newProduct as Product);

    operation.subscribe({
      next: () => {
        this.loadProducts();
        this.displayDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Producto ${this.selectedProduct ? 'actualizado' : 'creado'} correctamente`
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Error al guardar el producto'
        });
      }
    });
  }

  isFormValid(): boolean {
    return !!this.newProduct.name && this.newProduct.name.trim().length >= 3 &&
      !!this.newProduct.description && this.newProduct.description.trim().length >= 5 &&
      !!this.newProduct.price && this.newProduct.price > 0 &&
      this.newProduct.stock !== undefined && this.newProduct.stock >= 0 &&
      !!this.newProduct.category_id;
  }

  confirmDelete(productId: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteProduct(productId)
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado correctamente'
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar el producto'
        });
      }
    });
  }
}
