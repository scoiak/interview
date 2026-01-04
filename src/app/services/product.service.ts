import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';

import { Product, ProductResponse } from './product.interface';
import { Category } from './category.interface';

const LIMIT = 20;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'https://dummyjson.com/products';

  public readonly selectedCategory = signal<string>('');
  public readonly search = signal<string>('');
  private readonly page = signal(1);
  private readonly error = signal<string | null>(null);

  public readonly currentPage = this.page.asReadonly();
  public readonly error$ = this.error.asReadonly();

  private readonly requestParams = computed(() => ({
    category: this.selectedCategory(),
    page: this.page(),
    search: this.search(),
  }));

  private readonly productsResponse$ = toObservable(this.requestParams).pipe(
    switchMap(({ category, page, search }) => {
      const skip = (page - 1) * LIMIT;
      let url: string;

      if (search) {
        url = `${this.BASE_URL}/search?q=${search}`;
      } else if (category) {
        url = `${this.BASE_URL}/category/${category}?limit=${LIMIT}&skip=${skip}`;
      } else {
        url = `${this.BASE_URL}?limit=${LIMIT}&skip=${skip}`;
      }

      return this.http.get<ProductResponse>(url).pipe(
        catchError(() => {
          this.error.set('Failed to fetch products. Please try again later.');
          return of({ products: [], total: 0, skip: 0, limit: 0 });
        })
      );
    })
  );

  private readonly productsResponse = toSignal(this.productsResponse$);

  private readonly categories$ = this.http.get<Category[]>(`${this.BASE_URL}/categories`).pipe(
    catchError(() => {
      this.error.set('Failed to fetch categories.');
      return of([]);
    })
  );

  public readonly products = computed(() => this.productsResponse()?.products ?? []);
  public readonly totalPages = computed(() => {
    const response = this.productsResponse();
    if (!response) {
      return 1;
    }
    // The search endpoint returns all results at once, so pagination is not needed.
    if (this.search() && response.limit === 0) {
        return 1;
    }
    return Math.ceil(response.total / LIMIT);
  });
  public readonly categories = toSignal(this.categories$);

  public onPageChange(page: number): void {
    const total = this.totalPages();
    if (page > 0 && page <= (total || 1)) {
      this.page.set(page);
    }
  }

  public onSearchChange(searchTerm: string): void {
    this.search.set(searchTerm);
    this.page.set(1);
    if (searchTerm) {
      this.selectedCategory.set('');
    }
  }
}
