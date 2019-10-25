import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.page.html',
  styleUrls: ['./quotation.page.scss'],
})
export class QuotationPage implements OnInit {

  cartItems = [];
  productList: ProductListService;
  quoteNumber = '';
  constructor(productList: ProductListService) {
    this.productList = productList;
    this.quoteNumber = this.getQuoteNumber();
   }

  ngOnInit() {
    this.cartItems = this.productList.getCart();
  }

  getDate() {
    return new Date();
  }

  getQuoteNumber() {
    const quoteNumber = ((Math.random() * 9999) + 1) + 'milkIT';
    return btoa(quoteNumber).substring(0, 11);
  }

  getValidityPeriod() {
    const today = this.getDate();
    const currentDay = today.getDay();
    const validityExpiryDay = currentDay + 5;
    today.setDate(validityExpiryDay);
    return today;
  }

  computeSubTotal(quantity: number , price: number) {
    console.log(quantity + '\n' + price);
    return (quantity * price);
  }

  getTotal() {
    return this.productList.getTotal();
  }

}
