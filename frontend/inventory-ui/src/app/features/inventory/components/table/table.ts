import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input({ required: true }) products: Product[] = [];
  private router = inject(Router);

  getQuantityClass(quantity: number): string {
    if (quantity > 10) {
      return 'bg-success';
    }

    if (quantity > 0) {
      return 'bg-warning text-dark';
    }

    return 'bg-danger';
  }

  goToMovement(product: Product): void {
    this.router.navigate(['/movements'], {
      state: {
        product,
      }
    });
  }
}
