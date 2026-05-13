import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product.model';
import { Table } from '../../components/table/table';
import { ProductMovement } from '../../models/product-movement.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, Table],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory implements OnInit {
  private inventoryService = inject(InventoryService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);

  private toastr = inject(ToastrService);

  products: Product[] = [];

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe({
      next: (response) => {
        if (!response.isSuccess) {
          this.toastr.error(response.message);
          return;
        }

        this.products = response.data;
        this.toastr.success(response.message);
        this.cd.detectChanges();
      },
      error: () => {
        this.toastr.error('Error al cargar el inventario, por favor intente nuevamente.');
      },
    });
  }

  registerMovement(movement: ProductMovement): void {
    this.inventoryService.registerMovement(movement).subscribe({
      next: (response) => {
        if (!response.isSuccess) {
          this.toastr.error(response.message);
          return;
        }

        this.toastr.success(response.message);
        this.loadInventory();
      },
      error: () => {
        this.toastr.error('Error al registrar el movimiento, por favor intente nuevamente.');
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
