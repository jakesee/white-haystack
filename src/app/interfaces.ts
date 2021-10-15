import { EventEmitter } from '@angular/core';
import { Invoice } from './invoice-controller.service';

export interface IAppConfig {
  providerId: number;
  theme: ITheme;
  logoUrl: string;
  menuItems: Array<IMenuItem>;
  pageStyle: IPageStyle;
  header: ISection;
  footer: ISection;
  sections: Array<ISection>;
}

export interface ITheme {
  // body
  "--theme-font-family": string;

  "--theme-color-background": string;
  "--theme-color-on-background": string;
  "--theme-color-surface": string;
  "--theme-color-on-surface": string;

  // theme colors
  "--theme-color-neutral--2": string;
  "--theme-color-neutral--1": string;
  "--theme-color-neutral-0": string;
  "--theme-color-neutral-1": string;
  "--theme-color-neutral-2": string;

  "--theme-color-on-neutral--2": string;
  "--theme-color-on-neutral--1": string;
  "--theme-color-on-neutral-0": string;
  "--theme-color-on-neutral-1": string;
  "--theme-color-on-neutral-2": string;

  "--theme-color-primary--2": string;
  "--theme-color-primary--1": string;
  "--theme-color-primary-0": string;
  "--theme-color-primary-1": string;
  "--theme-color-primary-2": string;

  "--theme-color-on-primary--2": string;
  "--theme-color-on-primary--1": string;
  "--theme-color-on-primary-0": string;
  "--theme-color-on-primary-1": string;
  "--theme-color-on-primary-2": string;

  "--theme-color-secondary--2": string;
  "--theme-color-secondary--1": string;
  "--theme-color-secondary-0": string;
  "--theme-color-secondary-1": string;
  "--theme-color-secondary-2": string;

  "--theme-color-on-secondary--2": string;
  "--theme-color-on-secondary--1": string;
  "--theme-color-on-secondary-0": string;
  "--theme-color-on-secondary-1": string;
  "--theme-color-on-secondary-2": string;

  // header/footer
  "--theme-header-background-color": string;
  "--theme-footer-background-color": string;

  // box
  "--theme-box-border-radius": string;

  "--theme-error-border-color": string,
  "--theme-error-background-color": string;
  "--theme-error-foreground-color": string;

  "--theme-warning-border-color": string,
  "--theme-warning-background-color": string;
  "--theme-warning-foreground-color": string;

  "--theme-info-border-color": string,
  "--theme-info-background-color": string;
  "--theme-info-foreground-color": string;

  "--theme-note-border-color": string,
  "--theme-note-background-color": string;
  "--theme-note-foreground-color": string;

  "--theme-success-border-color": string,
  "--theme-success-background-color": string;
  "--theme-success-foreground-color": string;

  // buttons
  "--theme-button-border-radius": string;
  "--theme-button-primary-border-color": string;
  "--theme-button-primary-background-color": string;
  "--theme-button-primary-foreground-color": string;
  "--theme-button-secondary-border-color": string;
  "--theme-button-secondary-background-color": string;
  "--theme-button-secondary-foreground-color": string;
  "--theme-button-primary-inactive-border-color": string;
  "--theme-button-primary-inactive-background-color": string;
  "--theme-button-primary-inactive-foreground-color": string;
  "--theme-button-secondary-inactive-border-color": string;
  "--theme-button-secondary-inactive-background-color": string;
  "--theme-button-secondary-inactive-foreground-color": string;
}

export interface IMenuItem {
  text: string;
  routerLink: string;
  icon: Array<string>;
  display: { public: boolean, private: boolean };
}

export interface ISection {
  component: string;
  config: any;
}

export interface IPageStyle {
  container: PageStyleContainerEnum;
  content: PageStyleContentEnum;
}

export enum PageStyleContainerEnum {
  fluidContainer = 'wh-fluid-container',
  container = 'wh-container',
}
export enum PageStyleContentEnum {
  contentCenter = 'wh-content-center',
  contentLeft = 'wh-content-left',
}

export interface IForm {

  nextHandler: EventEmitter<FormEvent>;
  backHandler: EventEmitter<FormEvent>;
  cancelHandler: EventEmitter<FormEvent>;

  evaluate(config: any) : boolean
}

export class FormEvent {
  constructor(public form: IForm) {}
}

export class Section {

  provider: IProvider;

  init(config: any, provider: IProvider): void {
    Object.assign(this, config);
    this.provider = provider;
  }
}

export interface IProvider {
  id: number;
  parentId: number,
  order: 0,
  title: string;
  logoUrl: string,
  description: string;
  category: string;
  isMemberRequired: boolean,
  sections: Array<ISection>;
  journey?: {
    start: IJourney,
    [key:string]: IJourney
  };
}

export interface IJourney {
  auth: boolean
  label: string,
  cmdCancel: any;
  cmdSuccess: any;
  sequence: Array<ISequenceItem>;
}

export interface ISequenceItem {
  stepName: string;
  component: string;
  config: any;
}

export interface IDatabase {
  users: IUser[];
  providers: IProvider[];
  appointments: IAppointment[];
}

export class IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;
  contact?: string;
  email?: string;
  imgUrl?: string;
  nationalId?: string;
  role: UserRole
}

export enum UserRole {
  patient = 1,
  doctor = 2,
  concierge = 4,
  admin = 8
}

export class User implements IUser {
  contact?: string;
  email?: string;
  imgUrl?: string;
  nationalId?: string;
  role: UserRole;
  id: number;
  username: string;
  password: string;
  episodes: any[];

  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;

  medicalCondition: string;
  medication: string;
  allergies: string;

  is2faEnabled: boolean;

  static create(template: object): User {
    let user = new User();
    Object.assign(user, template);

    return user;
  }

  get name(): string {
    return this.firstName + " " + this.lastName;
  }
}

export interface IEpisode {
  doctorName: string;
  doctorImgUrl: string;
  startAt: number;
  endAt: number;
}

export interface IAppointment {
  id: number;
  episodeId: number;
  providerId: number;
  doctorId: number;
  patientId: number;
  startAt: Date;
  endAt: Date;
  status: AppointmentStatus
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

export enum AppointmentStatus {
  Open = 'Open',
  Closed = 'Closed'
}
