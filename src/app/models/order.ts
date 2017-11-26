export class Order {
  orderGiver: string;
  orderDate: string;
  isPayed: boolean;
  products: {[k: string]: any};
}
