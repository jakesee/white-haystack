import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AppointmentStatus, BenefitScheme, FeeSystemType, FeeType, IInvoiceStatus } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class InvoiceControllerService {

  constructor() { }

  // line items
  addLineItems(items: IInvoiceLineItem[]): void { }
  addDiscountLineItems(items: IInvoiceLineItem[]): void { }
  addBenefitLineItems(items: IInvoiceLineItem[]): void { }
  addPaymentMethod(paymentMethod: object): void { }
  putLineItems(items: IInvoiceLineItem[]): void { }

  getLineItems(): IInvoiceLineItem[] { return [] as IInvoiceLineItem[]; }
  getDiscountLineItems(): IInvoiceLineItem[] { return [] as IInvoiceLineItem[]; }
  getFeeTypes(): FeeType[] { return [] as FeeType[]; }

  // status
  setStatus(status: IInvoiceStatus): void { }
  executePayment(): void { }
  executeRefund(): void { }
  setPaymentOutcome(): void { }
  getStatus(): IInvoiceStatus { return {} as IInvoiceStatus; }

  // output
  getMetaData(): IInvoiceMetadata {

    let metadata: IInvoiceMetadata = {
      "invoiceId": 432653,
      "episodeId": 123423,
      "group": {
        id: 801,
        name: "AXA DTAC Virtual Clinic"
      },
      "patient": {
        "id": 45213,
        "firstName": "Jake",
        "lastName": "See",
        "birthdate": new Date(1985, 1, 22),
        "phone": "90889411"
      },
      "doctor": {
        "id": 8423,
        "clinic": "MyDoc Pte Ltd",
        "firstName": "Matthew",
        "lastName": "Lee",
        "phone": "86724922"
      },
      "invoiceDate": new Date(),
      "isPaymentMethodCollected": false,
      "status": AppointmentStatus.Closed,
    };

    return metadata;
  }

  getInvoice(id: number): Invoice {

    let lineItems = Array(
      new InvoiceLineItem(1, id, FeeType.Consult, "Teleconsultation Fee", 25),
      this.__getRandomDrugLineItem(1, id),
      this.__getRandomDrugLineItem(2, id),
      this.__getRandomDrugLineItem(3, id),
      this.__getRandomDrugLineItem(4, id),
      this.__getRandomDrugLineItem(5, id),
      new InvoiceLineItem(1, id, FeeType.Delivery, "Delivery", 8, 1, BenefitScheme.NOT_APPLICABLE),
      new InvoiceLineItem(1, id, FeeType.Consumables, "Bandages", 8, 1, BenefitScheme.NOT_APPLICABLE),
    );

    let invoice = new Invoice(this.getMetaData(), lineItems, 'SGD', "GST", 0.07);

    return invoice;
  }

  private __getRandomDrugLineItem(lineItemId: number, invoiceId: number): IInvoiceLineItem {
    return new InvoiceLineItem(
      lineItemId,
      invoiceId,
      FeeType.Prescription, this.__getRandomDrugName(),
      Math.round(Math.random() * 100) / 100,
      Math.trunc(Math.random() * 12) * 2
    );
  }

  private __getRandomDrugName(): string {
    const drugs = [
      "Monotroptoxin",
      "Lientocin",
      "Bristur",
      "Lonkocin",
      "Tetrabrossennene",
      "Iturrhykyme",
      "Monochunsinhine",
      "Pentaeveguphansose",
      "Pimphonsarnoxin",
      "Tricchaabdeelteite",
      "Tridein",
      "Heptaepsimnycin",
      "Triceulcine",
      "Heptabelchine",
      "Monothignorphin",
      "Heptaepsapthardid",
      "Pentaegalacchene",
      "Echaenkyscoviol",
      "Hexamuisyrsester",
      "Apsosgasy",
      "Eprondane",
      "Triglole",
      "Monocheiptyde",
      "Dusplebron",
      "Rharherhel",
      "Fleagnanzyn",
      "Apsinthakochor",
      "Estreffotoncox"
    ];

    let index = Math.trunc(Math.random() * drugs.length);
    return drugs[index];
  }
}

export interface IBillTotal {
  subTotals: { [key in FeeType]: ISubTotal },
  isTaxIncluded: boolean,
  taxLabel: string,
  taxRate: number, // 0..1
  taxAmount: number,
  billTotalAmount: number,
  billTotalWithTax: number,
  claimTotalAmount: number,
  claimTotalAmountWithTax: number,
  balancePayable: number
}

export interface ISubTotal {
  bill: number;
  claim: number;
}

export class Invoice {

  totals: IBillTotal = {} as IBillTotal;

  constructor(public metadata: IInvoiceMetadata, public lineItems: IInvoiceLineItem[], public currency: string, taxLabel?:string, taxRate?: number) {
    this.totals.isTaxIncluded = taxLabel ? true : false;
    this.totals.taxLabel = taxLabel ?? '';
    this.totals.taxRate = taxRate ?? 0;

    // initialize subTotals
    this.totals.subTotals = {} as { [key in FeeType]: ISubTotal };
    _.each(FeeType, (ft) => { this.totals.subTotals[ft] = { bill: 0, claim: 0 } as ISubTotal; });

    this.__calcTotals();
  }

  public getFeeTypes(): string[] {
    let lineItemsByFeeType = _.groupBy(this.lineItems, (item) => {
      return item.feeType;
    });

    return Object.keys(lineItemsByFeeType);
  }

  public getLineItemsByFeeType(feeType: FeeType | string) {
    return _.filter(this.lineItems, (item) => {
      return item.feeType == feeType;
    });
  }

  private __calcTotals() {

    // calculate the feeType subtotals
    this.lineItems.forEach((item) => {
      let isGoodsAndServices = item.feeType != FeeType.Payment && item.feeSystemType == FeeSystemType.Default;
      if (isGoodsAndServices) {
        this.totals.subTotals[item.feeType].bill += item.amount;
      }
    });

    // populate the intial feetype discount.amount values
    var maxDiscountByFeeType = _.cloneDeep(this.totals.subTotals);
    this.lineItems.forEach((item, index) => {
      let isDiscount = item.feeType != FeeType.Payment && item.feeSystemType == FeeSystemType.Voucher;
      if (isDiscount) {
        if (item.rate != null) {
          this.lineItems[index].amount = -(item.rate * this.totals.subTotals[item.feeType].bill);
        } else {
          // this is a $ discount and the amount value is already available
        }

        // another adjustment because we cannot discount more than the current remaining subtotal
        this.lineItems[index].amount = -Math.min(-item.amount, maxDiscountByFeeType[item.feeType].bill)
        maxDiscountByFeeType[item.feeType].bill += this.lineItems[index].amount;
      }
    });

    // total payable
    this.lineItems.forEach((item, index) => {
      let isIncluded = item.feeType != FeeType.Payment && item.feeSystemType != FeeSystemType.Benefit;
      if (isIncluded) {
        this.totals.subTotals[item.feeType].bill += item.amount
        if (item.scheme == BenefitScheme.APPLICABLE)
          this.totals.subTotals[item.feeType].claim += item.amount
      }
    });
    _.each(this.totals.subTotals, (item, key: FeeType, collection) => {
      this.totals.billTotalAmount += this.totals.subTotals[key].bill = Math.max(0, item.bill);
      this.totals.claimTotalAmount += this.totals.subTotals[key].claim = Math.max(0, item.claim);
    });

    // tax
    if (this.totals.isTaxIncluded) {
      this.totals.taxAmount = this.totals.taxRate * this.totals.billTotalAmount;
      this.totals.billTotalWithTax = this.totals.billTotalAmount + (1 + this.totals.taxRate);
      this.totals.claimTotalAmountWithTax = this.totals.claimTotalAmount * (1 + this.totals.taxRate);
    }

    // objective: calculate item.amount for benefit line items
    this.lineItems.forEach((item) => {
      let isBenefitLineItem = item.feeSystemType == FeeSystemType.Benefit && item.feeType == FeeType.Payment;
      if (isBenefitLineItem) this.__calcBenefitAmount(item, this.totals.claimTotalAmountWithTax); // 99.9% of the time there is only 1 benefit line item
    });


    // at this point, ALL line items have item.amount value; whether it is positive or negative value, therefore...
    this.totals.balancePayable = 0;
    this.lineItems.forEach((item) => {
      this.totals.balancePayable += item.amount; // this will eventually give balance amount that patient has to pay.
    });
    // just in case there is a payment voucher that exceeds the total balance payable,
    // balance payable must not be negative value
    this.totals.balancePayable = Math.max(0, this.totals.balancePayable);
  }

  private __calcBenefitAmount(benefit: IInvoiceLineItem, claimAmount: number): boolean | number {
    switch (benefit.scheme) {
      case BenefitScheme.LIMIT:
        return this.__calcBenefitLimit(benefit, claimAmount);
      case BenefitScheme.POOL:
        return this.__calcBenefitPool(benefit, claimAmount);
      case BenefitScheme.DEDUCTIBLE_RATE:
        return this.__calcBenefitDeductibleRate(benefit, claimAmount);
      case BenefitScheme.DEDUCTIBLE_AMOUNT:
        return this.__calcBenefitDeductibleAmount(benefit, claimAmount);
      case BenefitScheme.COPAY_RATE:
        return this.__calcBenefitCoPayRate(benefit, claimAmount);
      case BenefitScheme.COPAY_RATE:
        return this.__calcBenefitCoPayAmount(benefit, claimAmount);
      default:
        throw new Error(); // should not reach here
    }
  }

  private __calcBenefitLimit(benefit: IInvoiceLineItem, claimAmount: number): boolean | number {
    var db = {} as DB;
    // find out how many times the code is used
    var used = db.count("code = " + benefit.code).result<number>();
    var balance = benefit.max - used;
    if (balance > 0) {
      benefit.amount = -claimAmount;
      return benefit.amount; // success
    } else {
      return false; // cannot use this benefit because no balance remaining
    }
  }

  private __calcBenefitPool(benefit: IInvoiceLineItem, claimAmount: number): boolean | number {
    var db = {} as DB;
    // find out how much money insurer has paid based on this code
    var used = db.select("code = " + benefit.code).sum("amount").result<number>();
    var balance = benefit.max - used;
    if (balance > 0) {
      var patientShare = Math.max(0, claimAmount - balance);
      benefit.amount = claimAmount - patientShare;

      return benefit.amount;
    }
    else {
      return false; // cannot use this benefit because no balance remaining
    }
  }

  private __calcBenefitDeductibleRate(benefit: IInvoiceLineItem, claimAmount: number): number {
    benefit.amount = benefit.rate * claimAmount;
    benefit.amount = Math.min(benefit.max, benefit.amount);
    return benefit.amount;
  }
  private __calcBenefitDeductibleAmount(benefit: IInvoiceLineItem, claimAmount: number): number {
    benefit.amount = Math.min(benefit.max, claimAmount);
    return benefit.amount;
  }
  private __calcBenefitCoPayRate(benefit: IInvoiceLineItem, claimAmount:number): number {
    var patient_share = benefit.rate * claimAmount;
    benefit.amount = Math.min(benefit.max, claimAmount - patient_share);
    return benefit.amount;
  }
  private __calcBenefitCoPayAmount(benefit: IInvoiceLineItem, claimAmount: number): number {
    var patient_share = Math.min(claimAmount, benefit.copay);
    benefit.amount = Math.min(benefit.max, claimAmount - patient_share);
    return benefit.amount;
  }
}

export interface DB {
  select(query?: any): DB;
  count(query?: any): DB;
  sum(query?: any): DB;
  groupBy(query?: any): DB;
  result<T>(): T;
}

export interface IInvoiceLineItem extends IBenefitLineItem, IDiscountLineItem, IGoodServiceLineItem {
  // as per everything included
}

export interface IGoodServiceLineItem {
  id: number;
  invoice_id: number;
  description: string;
  unitPrice: number, // decima;
  quantity: number;
  amount: number;

  // added due to benefits and discount system
  feeType: FeeType;
  feeSystemType: FeeSystemType;
  scheme: BenefitScheme;
}

export interface IDiscountLineItem extends IGoodServiceLineItem {
  rate: number;
  code: string;
}

export interface IBenefitLineItem extends IDiscountLineItem {
  copay: number;
  max: number;
}



export class InvoiceLineItem implements IInvoiceLineItem{

  amount: number = 0;

  constructor(
    public id: number,
    public invoice_id: number,
    public feeType: FeeType,
    public description: string,
    public unitPrice: number, // decimal
    public quantity: number = 1,
    public scheme: BenefitScheme = BenefitScheme.APPLICABLE,
    public feeSystemType: FeeSystemType = FeeSystemType.Default,
    public code: string = '',
    public max: number = -1,
    public rate: number = -1, // 0 to 1
    public copay: number = -1,
  ) { this.amount = unitPrice * quantity }
}







export interface IInvoiceMetadata {
  episodeId: number,
  invoiceId: number,
  status: AppointmentStatus,
  isPaymentMethodCollected: boolean,
  invoiceDate: Date,
  group: {
    id: number,
    name: string
  }
  patient: {
    id: number,
    firstName: string,
    lastName: string,
    birthdate: Date,
    phone: string
  },
  doctor: {
    id: number,
    firstName: string,
    lastName: string,
    clinic: string,
    phone: string;
  }
}
