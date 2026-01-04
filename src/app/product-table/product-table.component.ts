import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Product } from '../services/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, CurrencyPipe, TitleCasePipe],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  public readonly productService = inject(ProductService);
  public readonly products = input.required<Product[]>();
  public readonly productSelect = output<Product>();

  public onProductClick(product: Product): void {
    this.productSelect.emit(product);
  }
}
