import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-controls',
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  public readonly productService = inject(ProductService);
  public readonly categoryChange = output<string>();
  public readonly pageChange = output<number>();
  public readonly searchChange = output<string>();

  public onCategoryChange(category: string): void {
    this.categoryChange.emit(category);
  }

  public onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  public onSearchChange(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
}
