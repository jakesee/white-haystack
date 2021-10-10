import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class InvoiceControllerService {

  constructor() { }

  // line items
  addLineItems(items: InvoiceLineItem[]): void { }
  addDiscountLineItems(items: InvoiceLineItem[]): void { }
  addBenefitLineItems(items: InvoiceLineItem[]): void { }
  addPaymentMethod(paymentMethod: object): void { }
  putLineItems(items: InvoiceLineItem[]): void { }

  getLineItems(): InvoiceLineItem[] { return [] as InvoiceLineItem[]; }
  getDiscountLineItems(): InvoiceLineItem[] { return [] as InvoiceLineItem[]; }
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
      "status": ConsultationStatus.Closed,
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

  private __getRandomDrugLineItem(lineItemId: number, invoiceId: number): InvoiceLineItem {
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
  isTaxIncluded: boolean,
  billTotalAmount: number,
  taxLabel: string,
  taxRate: number, // 0..1
  taxAmount: number,
  billTotalWithTax: number,
  balancePayable: number
}

export class Invoice {

  totals: IBillTotal = {} as IBillTotal;

  constructor(public metadata: IInvoiceMetadata, public lineItems: InvoiceLineItem[], public currency: string, taxLabel?:string, taxRate?: number) {
    this.totals.isTaxIncluded = taxLabel ? true : false;
    this.totals.taxLabel = taxLabel ?? '';
    this.totals.taxRate = taxRate ?? 0;

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

    // total payable
    this.totals.billTotalAmount = 0;
    this.lineItems.forEach((item) => {
      if (item.feeSystemType == FeeSystemType.Default) {
        this.totals.billTotalAmount += item.amount;
      }
    });

    // tax
    if (this.totals.isTaxIncluded) {
      this.totals.taxAmount = this.totals.taxRate * this.totals.billTotalAmount;
      this.totals.billTotalWithTax = this.totals.taxAmount + this.totals.billTotalAmount;
    }

    // total benefit base amount
    let benefitBaseAmount = 0;
    this.lineItems.forEach((item) => {
      let isNotCoveredByBenefit = item.scheme != BenefitScheme.APPLICABLE || item.feeType == FeeType.Payment;
      if (!isNotCoveredByBenefit) benefitBaseAmount += item.amount;
    });
    benefitBaseAmount *= this.totals.taxRate + 1; // add the tax to the base amount


    // objective: calculate item.amount for benefit line items
    this.lineItems.forEach((item) => {
      let isBenefitLineItem = item.feeSystemType == FeeSystemType.Benefit && item.feeType == FeeType.Payment;
      if (isBenefitLineItem) this._calcBenefitAmount(item, benefitBaseAmount); // 99.9% of the time there is only 1 benefit line item
    });

    // at this point, ALL line items have item.amount value; whether it is positive or negative value, therefore...
    this.totals.balancePayable = 0;
    this.lineItems.forEach((item) => {
      this.totals.balancePayable += item.amount; // this will eventually give balance amount that patient has to pay.
    });
  }

  private _calcBenefitAmount(benefit: InvoiceLineItem, benefitBaseAmount: number): boolean | number {
    switch (benefit.scheme) {
      case BenefitScheme.LIMIT:
        return this._calcBenefitLimit(benefit, benefitBaseAmount);
      case BenefitScheme.POOL:
        return this._calcBenefitPool(benefit, benefitBaseAmount);
      case BenefitScheme.DEDUCTIBLE_RATE:
        return this._calcBenefitDeductibleRate(benefit, benefitBaseAmount);
      case BenefitScheme.DEDUCTIBLE_AMOUNT:
        return this._calcBenefitDeductibleAmount(benefit, benefitBaseAmount);
      case BenefitScheme.COPAY_RATE:
        return this._calcBenefitCoPayRate(benefit, benefitBaseAmount);
      case BenefitScheme.COPAY_RATE:
        return this._calcBenefitCoPayAmount(benefit, benefitBaseAmount);
      default:
        throw new Error(); // should not reach here
    }
  }

  private _calcBenefitLimit(benefit: InvoiceLineItem, benefitBaseAmount: number): boolean | number {
    var db = {} as DB;
    // find out how many times the code is used
    var used = db.count("code = " + benefit.code).result<number>();
    var balance = benefit.max - used;
    if (balance > 0) {
      benefit.amount = -benefitBaseAmount;
      return benefit.amount; // success
    } else {
      return false; // cannot use this benefit because no balance remaining
    }
  }

  private _calcBenefitPool(benefit: InvoiceLineItem, benefitBaseAmount: number): boolean | number {
    var db = {} as DB;
    // find out how much money insurer has paid based on this code
    var used = db.select("code = " + benefit.code).sum("amount").result<number>();
    var balance = benefit.max - used;
    if (balance > 0) {
      var patientShare = Math.max(0, benefitBaseAmount - balance);
      benefit.amount = benefitBaseAmount - patientShare;

      return benefit.amount;
    }
    else {
      return false; // cannot use this benefit because no balance remaining
    }
  }

  private _calcBenefitDeductibleRate(benefit: InvoiceLineItem, benefitBaseAmount: number): number {
    benefit.amount = benefit.rate * benefitBaseAmount;
    benefit.amount = Math.min(benefit.max, benefit.amount);
    return benefit.amount;
  }
  private _calcBenefitDeductibleAmount(benefit: InvoiceLineItem, benefitBaseAmount: number): number {
    benefit.amount = Math.min(benefit.max, benefitBaseAmount);
    return benefit.amount;
  }
  private _calcBenefitCoPayRate(benefit: InvoiceLineItem, benefitBaseAmount:number): number {
    var patient_share = benefit.rate * benefitBaseAmount;
    benefit.amount = Math.min(benefit.max, benefitBaseAmount - patient_share);
    return benefit.amount;
  }
  private _calcBenefitCoPayAmount(benefit: InvoiceLineItem, benefitBaseAmount: number): number {
    var patient_share = Math.min(benefitBaseAmount, benefit.copay);
    benefit.amount = Math.min(benefit.max, benefitBaseAmount - patient_share);
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

export enum IInvoiceStatus {
  New, // no payment method
  Pending, // has payment method, waiting to be executeced
  Void, // invoice is cancelled
  Paid, // invoice payment is successful
  FailedPayment // payment is not successful; Failed Payment may have another payment method applied and status becomes pending.
}

export enum FeeType {
  Payment = "Payment",
  Consult = "Consultation",
  Prescription = "Prescription",
  Delivery = "Delivery",
  Applicable = "Applicable Fees",
  DrugsInjections = "Drugs and Injections",
  MedicalProcedure = "Medical Procedure",
  Consumables = "Consumables",
  Others = "Others",
}

export enum FeeSystemType {
  Default = 0,
  Voucher = 1,
  Benefit = 2
}

export enum BenefitScheme {
  // default line items
  NOT_APPLICABLE = 0,
  APPLICABLE = 1,

  // benefit line items
  LIMIT = 2,
  POOL = 3,
  DEDUCTIBLE_RATE = 4,
  DEDUCTIBLE_AMOUNT = 5,
  COPAY_RATE = 6,
  COPAY_AMOUNT = 7
}

export class InvoiceLineItem {

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
export enum ConsultationStatus {
  Open = 'Open',
  Closed = 'Closed'
}

export interface IInvoiceMetadata {
  episodeId: number,
  invoiceId: number,
  status: ConsultationStatus,
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
