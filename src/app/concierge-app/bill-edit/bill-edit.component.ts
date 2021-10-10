import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice, InvoiceControllerService, InvoiceLineItem } from '@app/invoice-controller.service';
import * as _ from 'lodash';

import { MatAccordion } from '@angular/material/expansion';
import { BenefitScheme, FeeSystemType, FeeType } from '@app/interfaces';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})
export class BillEditComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;


  invoice: Invoice;

  lineItems: InvoiceLineItem[] = Array();

  constructor(private _invoice: InvoiceControllerService) {

    this.invoice = _invoice.getInvoice(123);
    this.lineItems = this.invoice.lineItems;

    console.log(this.lineItems);
  }

  getFeeTypes(): FeeType[] {
    let cat = Object.keys(_.groupBy(this.lineItems, (item) => {
      return item.feeType;
    }));

    return cat as FeeType[];
  }

  getGoodsAndServices(feeType: FeeType) {
    return _.filter(this.lineItems, (item) => {
      return item.feeType == feeType;
    });
  }

  getPayments(): InvoiceLineItem[] {
    return _.filter(this.lineItems, (item) => {
      return item.feeType == FeeType.Payment;
    });
  }

  onAddNewItem($event: any) {

    // set defaults
    let code = '';
    let scheme = BenefitScheme.APPLICABLE;
    let feeSystemType = FeeSystemType.Default;
    let feeType = $event.target['feeType'].value as FeeType;

    // check whether discount voucher is beign added
    if (feeType == FeeType.Payment) {
      code = $event.target['code'].value;
      scheme = BenefitScheme.NOT_APPLICABLE;
      feeSystemType = FeeSystemType.Voucher;
    }

    // create and add line item
    var item = new InvoiceLineItem(
      4,
      this.invoice.metadata.invoiceId,
      $event.target['feeType'].value,
      $event.target['description'].value,
      $event.target['unitPrice'].value,
      $event.target['quantity'].value,
      scheme,
      feeSystemType,
      code
    );
    this.lineItems.push(item);

    return false;
  }

  ngOnInit(): void {

  }
}
