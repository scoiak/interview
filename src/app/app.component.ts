import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from './services/product.service';
import { Product } from './services/product.interface';

import { ControlsComponent } from './controls/controls.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ControlsComponent,
    ProductTableComponent,
    ProductModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly productService = inject(ProductService);
  public readonly selectedProduct = signal<Product | undefined>(undefined);

  public onCategoryChange(category: string): void {
    if (this.productService.selectedCategory() !== category) {
      this.productService.selectedCategory.set(category);
      this.productService.onSearchChange('');
      this.onPageChange(1);
    }
  }

  public onPageChange(page: number): void {
    this.productService.onPageChange(page);
  }

  public onSearchChange(searchTerm: string): void {
    this.productService.onSearchChange(searchTerm);
  }

  public onProductSelect(product: Product): void {
    this.selectedProduct.set(product);
  }

  public onCloseModal(): void {
    this.selectedProduct.set(undefined);
  }
}
