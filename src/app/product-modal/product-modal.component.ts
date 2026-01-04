import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  ViewChild
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../services/product.interface';

@Component({
  selector: 'app-product-modal',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent implements AfterViewInit {
  public readonly product = input.required<Product>();
  public readonly close = output<void>();

  @ViewChild('closeButton') private readonly closeButton?: ElementRef<HTMLButtonElement>;

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.closeButton?.nativeElement.focus();
    });
  }

  public onCloseModal(): void {
    this.close.emit();
  }
}
