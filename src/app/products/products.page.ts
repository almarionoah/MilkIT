import { Component, OnInit } from '@angular/core';
import { Products } from './products.model';
import { PopoverController } from '@ionic/angular';
import { QuantityPage } from '../quantity/quantity.page';
import {ProductListService} from '../product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Products[];
  quantityAlertShouldShow = true;
  successAddAlertShouldShow = true;
  successRemoveAlertShouldShow = true;
  emptyCartAlertShouldShow = true;
  productColorScheme = '';
  isPrintSelected = true;
  cartItems = [];
  total = 0;
  constructor(private popoverController: PopoverController, private productList: ProductListService, private router: Router) { }
  ngOnInit() {
    this.products = this.productList.getProducts();
  }

  async toggleQuantity(productId: any) {
  const popover = await this.popoverController.create({
    component: QuantityPage,
    componentProps: {
      productID: productId
    },
  });
  return await popover.present();
 }

 closeEmptyCartAlertBoxCheckOut() {
   this.emptyCartAlertShouldShow = true;
 }

 closeSuccessRemoveAlertBox() {
  this.successRemoveAlertShouldShow = true;
 }

 closeSuccessAddAlertBox() {
  this.successAddAlertShouldShow = true;
 }
 closeQuantityAlertBox() {
  this.quantityAlertShouldShow = true;
 }
 getTotal() {
   return this.productList.getTotal();
 }
 getCartLength() {
  return this.productList.getCartLength();
 }

 isInCart(productID) {
  return this.productList.isInCart(productID);
 }

 productColor(productID) {
  const isProductInCart = this.isInCart(productID);
  if (isProductInCart === true) {
    return 'tertiary';
  }
 }

 openQuotation() {
   const cartLength = this.getCartLength();
   if (cartLength > 0) {
     this.router.navigateByUrl('/quotation');
   }
 }

}
