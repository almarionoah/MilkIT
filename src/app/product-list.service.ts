import { Injectable } from '@angular/core';
import { Products } from './products/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private cart: Products[] = [];
  private total = 0;
  products: Products[] = [
    {
      product_id: 0,
      product_name: 'milk sachet',
      product_size: '1L',
      product_price: 12.50,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 1,
      product_name: 'milk bottle',
      product_size: '2L',
      product_price: 16.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 2,
      product_name: 'milk bottle',
      product_size: '250 ml',
      product_price: 6.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 3,
      product_name: 'milk bottle',
      product_size: '500ml',
      product_price: 8.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 4,
      product_name: 'cream',
      product_size: '2L',
      product_price: 22.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 5,
      product_name: 'cream',
      product_size: '1L',
      product_price: 18.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 6,
      product_name: 'cream',
      product_size: '500ml',
      product_price: 10.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 7,
      product_name: 'cream',
      product_size: '250ml',
      product_price: 6.50,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 8,
      product_name: 'juice',
      product_size: '250ml',
      product_price: 8.99,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 9,
      product_name: 'juice',
      product_size: '500ml',
      product_price: 11.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 10,
      product_name: 'juice',
      product_size: '1L',
      product_price: 15.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 11,
      product_name: 'juice',
      product_size: '2L',
      product_price: 20.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 12,
      product_name: 'juice',
      product_size: '5L',
      product_price: 28.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 13,
      product_name: 'yogurt',
      product_size: '2L',
      product_price: 25.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 14,
      product_name: 'yogurt',
      product_size: '1L',
      product_price: 18.50,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 15,
      product_name: 'yogurt',
      product_size: '500ml',
      product_price: 15.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 16,
      product_name: 'yogurt',
      product_size: '250ml',
      product_price: 9.00,
      product_url: '',
      quantity: 0
    },
    {
      product_id: 17,
      product_name: 'turtles',
      product_size: '1.2L',
      product_price: 40.00,
      product_url: '',
      quantity: 0
    }
  ];
  constructor() { }

  getProducts() {
    return this.products;
  }

  getProduct(productId: number) {
   return this.products.find(product => product.product_id === productId);
  }

  addItem(product: Products) {
    this.cart.push(product);
  }

  removeItem(productId: number) {
    const currentCart = this.getCart();
    if (currentCart.length > 0) {
      for (let i = 0; i < currentCart.length; i++) {
        const item = currentCart[i];
        if (item.product_id === productId) {
            currentCart.splice(i, 1);
          }
        break;
        }
      return true;
      }
    return false;

  }

  isInCart(productId: number) {
    const currentCart = this.getCart();
    if ((currentCart.length > 0)) {
      const hasProduct = currentCart.find(product => product.product_id === productId);
      if (hasProduct !== null && hasProduct !== undefined) {
      return true;
    }
  }
    return false;
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    this.total = 0;
    if (this.cart.length > 0) {
        this.cart.forEach((product) => {
          this.total += (product.product_price * product.quantity);
        });
    }
    return this.total;
  }

  getCartLength() {
    return (this.cart.length);
  }



}
