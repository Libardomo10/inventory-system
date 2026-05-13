import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { MovementType } from '../../../../core/enums/movement-type';
import { MaxQuantitys } from '../../../../core/enums/max-quantitys';

@Component({
  selector: 'app-movements',
  imports: [CommonModule, FormsModule],
  templateUrl: './movements.html',
  styleUrl: './movements.scss',
})
export class Movements implements OnInit {
  private inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);
  private cd = inject(ChangeDetectorRef);

  product!: Product;
  quantity: number = 0;
  movementType: number = 0;
  maxQuantity: number = MaxQuantitys.maxQuantity;

  ngOnInit(): void {
    const navigation = history.state;

    this.product = navigation.product;
  }

  backInventory(): void {
    history.back();
  }

  increase(): void {
    this.movementType = MovementType.Entry;
    this.saveMovement();
  }

  decrease(): void {
    if (this.product.quantity <= Number(this.quantity)) {
      this.toastr.error(
        'No se puede registrar una salida con una cantidad mayor a la disponible en el inventario.',
      );
      return;
    }

    this.movementType = MovementType.Exit;
    this.saveMovement();
  }

  onlyNumbers(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  validateQuantity(): void {
    if (this.quantity > this.maxQuantity) {
      this.quantity = this.maxQuantity;
    }

    if (this.quantity < 0) {
      this.quantity = 0;
    }
  }

  saveMovement(): void {
    const movement = {
      productId: this.product.id,
      quantity: Number(this.quantity),
      type: this.movementType,
    };

    if (movement.quantity === 0) {
      this.toastr.warning('La cantidad del movimiento no puede ser cero.');
      return;
    }

    this.inventoryService.registerMovement(movement).subscribe({
      next: (response) => {
        if (!response.isSuccess) {
          this.toastr.error(response.message);
          return;
        }
        this.toastr.success(response.message);
        this.product.quantity =
          this.product.quantity +
          (this.movementType === MovementType.Entry
            ? Number(this.quantity)
            : -Number(this.quantity));
        this.cd.detectChanges();
      },
      error: () => {
        this.toastr.error('Error al registrar el movimiento, por favor intente nuevamente.');
      },
    });
  }
}
