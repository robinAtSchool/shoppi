export class Product {
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  labels: {[k: string]: any};
  specs: {[k: string]: any};
  available: number;
}
