import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list.service';
import * as $ from 'jquery';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var paysafe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  productList: any;
  approvedCredit: any;
  alertController: any;
  areFieldsValid = true;
  expiryDate = new Date();
  http: HttpClient;
  nav: NavController;
  constructor(productList: ProductListService, alertController: AlertController, http: HttpClient, nav: NavController) {
    this.productList = productList;
    this.alertController = alertController;
    this.http = http;
    this.nav = nav;
  }

  ngOnInit() {
    this.assignListners();
  }
  private getApiKey() {
    return 'bWVyY2hhbnR0ZXN0YWxtYXJpb25vYWg6SEw4TmxkOWp4cWxNeGVPeg==';
  }
  getTotal() {
    return this.productList.getTotal();
  }

 async processPayment() {
    // const merchantEncodedHeader = 'Authorization: Basic ' + this.getApiKey();
    const cardDetails = {
      merchantRefNum: 'test_almarionoah_' + (new Date()), // needs to be changed for production
      amount : this.getTotal(),
      settleWithAuth: true,
      card : {
        paymentToken : this.approvedCredit
      }
    };
    const cardDetailsEncoded = JSON.stringify(cardDetails);
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/json' );
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Authorization: Basic ', this.getApiKey());
    this.http.post('https://api.paysafe.com/cardpayments/v1/accounts/1001516590/auths/', cardDetailsEncoded, { headers: header })
    .subscribe(async (response) => {
      console.log(response);
      const alert = await this.alertController.create({
        header: 'Payment Successful',
        message: 'Payment successfully processed.',
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.moveToLocalePage();
          }}]
      });
      await alert.present();
    }, async (error) => {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Oops... Something went wrong',
        message: 'Ensure card details are correct and try again',
        buttons: ['OK']
      });
      await alert.present();
    });
    /*$.ajax({
    url: 'https://api.test.paysafe.com/cardpayments/v1/accounts/1001516590/auths/',
    crossDomain: true,
    headers: {merchantEncodedHeader},
    type: 'POST',
    data: cardDetailsEncoded,
    success: async (result) => {
      const alert = await this.alertController.create({
        header: 'Payment Successful',
        message: 'Payment successfully processed.',
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.closePaymentGateWay();
          }}]
      });
      await alert.present();
    },
    error: async (err) => {
      const alert = await this.alertController.create({
        header: 'Oops... Something went wrong',
        message: 'Ensure card details are correct and try again',
        buttons: ['OK']
      });
      await alert.present();
    }
    });*/
  }

   assignListners() {
    const options = {
      enviroment: 'Production', // needs to be altered for production purposes.
      fields: {
        cardNumber: {
        selector: '#card_number'
        },
        expiryDate: {
         selector: '#expiry_date'
        },
        cvv: {
         selector: '#cvv',
         optional: false
        }
      }
    };

    paysafe.fields.setup(this.getApiKey(), options, (instance, error) => {
     // session = instance;
     if (error) {
       console.log(error.code + '\n' + error.message);
       this.navigateBack();
     }
     document.getElementById('card_number').addEventListener('change', () => {this.validateFields(instance); });
     document.getElementById('expiry_date').addEventListener('change', () => {this.validateFields(instance); });
     document.getElementById('cvv').addEventListener('change', () => {this.validateFields(instance); });
     document.getElementById('order').addEventListener('click', () => {
      const instanceScenarios = instance != null && instance !== undefined && instance !== '';
      const emptyFieldScenarios = $('#card_number').val() !== '' && $('#expiry_date').val() !== '' && $('#cvv').val() !== '';
      if (instanceScenarios && emptyFieldScenarios) {
           instance.tokenize((instance, err, result) => {
              if (err) {
                  $('#card_payment_error').html('<span class="closeBtn" onclick="closeCardPaymentErrorAlertBox()">&times;</span><h3>Oh No!<br/>' + err.displayMessage + '<hr/></h3><br/>');
                  $('#card_payment_error').show();
                  console.log('error in tokening');
              } else {
                  this.approvedCredit = result.token;
                  this.processPayment();
                  console.log('Fields are valid and i work');
              }
           });
      }
       });
     }); // initalize the hosted iframes using the SDK setup function
  }

 validateFields(instance) {

    instance.fields.cardNumber.invalid(() => {
      $('#card_number_error').show();
    });

    instance.fields.cardNumber.valid(() => {
      $('#card_number_error').hide();
    });

    if (instance.fields.cardNumber.isEmpty()) {
      $('#card_number_error').hide();
    }

    instance.fields.expiryDate.invalid(() => {
      $('#expiry_date_error').show();
    });

    instance.fields.expiryDate.valid(() => {
      $('#expiry_date_error').hide();
    });

    if (instance.fields.expiryDate.isEmpty()) {
      $('#expiry_date_error').hide();
    }

    instance.fields.cvv.invalid(() => {
      $('#cvv_error').show();
    });

    instance.fields.cvv.invalid(() => {
      $('#cvv_error').hide();
    });

    if (instance.fields.cvv.isEmpty()) {
      $('#cvv_error').hide();
    }
    if ($('#card_number').val() !== '' && $('#expiry_date').val() !== '' && $('#cvv').val() !== '') {
      this.areFieldsValid = false;
    }


}

getDate() {
  return new Date();
}

  moveToLocalePage() {
    this.nav.navigateForward('/location/');
  }

  navigateBack() {
    this.nav.navigateBack('/quotation/');
  }

}
