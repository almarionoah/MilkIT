import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ProductListService } from '../product-list.service';
import { popoverController } from '@ionic/core';
import { ProductsPage } from '../products/products.page';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.page.html',
  styleUrls: ['./quantity.page.scss'],
})
export class QuantityPage implements OnInit {
 quantity = 0;
 productId: number; // must become string or hexadecimal
 btnAddToCartIsEnabled = false;
 btnRemoveFromCartIsEnabled = true;
 productIsAdded = false;
 productIsRemoved = false;
 quantityIsCorrect = false;
 popoverController: PopoverController;
  constructor(private navParameter: NavParams, private productList: ProductListService, popoverController: PopoverController) {
    this.popoverController = popoverController;
  }

  ngOnInit() {
   this.productId = this.navParameter.data.productID;
   if (this.productList.isInCart(this.productId) === true) {
    this.btnAddToCartIsEnabled = true;
    this.btnRemoveFromCartIsEnabled = false;
    } else {
      this.btnAddToCartIsEnabled = false;
    }
  }
  addToCart() {
    if ((Number(this.quantity) !== undefined) &&
     (Number(this.quantity) !== null) && (Number(this.quantity) > 0)
      && (this.productList.isInCart(this.productId) === false)) {
      const product = this.productList.getProduct(this.productId);
      product.quantity = this.quantity;
      this.productList.addItem(product);
      this.btnAddToCartIsEnabled = true;
      this.btnAddToCartIsEnabled = false;
      this.productIsAdded = true;
    } else {
      this.quantityIsCorrect = false;
    }
    this.closeQuantityDialog();
  }

  removeFromCart() {
    const productId = this.navParameter.get('productID');
    console.log(productId);
    this.btnRemoveFromCartIsEnabled =  !(this.productList.removeItem(productId));
    this.productIsRemoved = true;
    this.productIsAdded = false;
    this.closeQuantityDialog();
  }

  closeQuantityDialog() {
    popoverController.dismiss();
  }

  getQuantityAlertStatus() {
    return (this.quantityIsCorrect);
  }

  getAddedToCartAlertStatus() {
    return (this.productIsAdded);
  }

  getRemovedFromCartAlertStatus() {
    return (this.productIsRemoved);
  }
}
