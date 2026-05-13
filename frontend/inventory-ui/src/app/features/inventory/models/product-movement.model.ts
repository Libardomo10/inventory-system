import { MovementType } from "../../../core/enums/movement-type";

export interface ProductMovement {
  productId: number;
  type: MovementType;
  quantity: number;
}
