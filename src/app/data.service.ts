import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { CollectPersonalInfoFormComponent } from '@app/patient-app/form/collect-personal-info-form/collect-personal-info-form.component';
import { ConsultNowComponent } from '@app/patient-app/sections/consult-now/consult-now.component';
import { TriageFormComponent } from '@app/patient-app/form/triage-form/triage-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergencyFormComponent } from '@app/patient-app/form/emergency-form/emergency-form.component';
import { SymptomsSectionComponent } from '@app/patient-app/sections/symptoms-section/symptoms-section.component';
import { OnetwothreeSectionComponent } from '@app/patient-app/sections/onetwothree-section/onetwothree-section.component';
import { BannerSectionComponent } from '@app/patient-app/sections/banner-section/banner-section.component';
import { NeedAssistanceSectionComponent } from '@app/patient-app/sections/need-assistance-section/need-assistance-section.component';
import { NextAppointmentInfoFormComponent } from '@app/patient-app/form/next-appointment-info-form/next-appointment-info-form.component';
import { RequestAppointmentFormComponent } from '@app/patient-app/form/request-appointment-form/request-appointment-form.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TitleBarSectionComponent } from '@app/patient-app/sections/title-bar-section/title-bar-section.component';
import { ProviderEligibilityFormComponent } from '@app/patient-app/form/provider-eligibility-form/provider-eligibility-form.component';
import { SubProvidersSectionComponent } from '@app/patient-app/sections/sub-providers-section/sub-providers-section.component';
import { AppointmentStatus, IAppConfig, IAppointment, IDatabase, IProvider, ITheme, IUser, User, UserRole } from './interfaces';
import { Database, Generator } from '../assets/database';
import { MedicalProfileFormComponent } from '@app/patient-app/form/medical-profile-form/medical-profile-form.component';
import { FooterComponent } from '@app/patient-app/page/footer/footer.component';
import { HeaderComponent } from '@app/patient-app/page/header/header.component';
// import { MyDoc as Partner } from '@app/patient-app/partner/theme-mydoc';
import { Daiichi as Partner } from '@app/patient-app/partner/theme-daiichi'
// import { Bowtie as Partner } from '@app/patient-app/partner/theme-bowtie'
import * as _ from 'lodash';
import { RecentFeedsSectionComponent } from '@app/patient-app/sections/recent-feeds-section/recent-feeds-section.component';
import { RecentProvidersSectionComponent } from '@app/patient-app/sections/recent-providers-section/recent-providers-section.component';
import { CategorySectionComponent } from '@app/patient-app/sections/category-section/category-section.component';
import { HtmlFormComponent } from '@app/patient-app/form/html-form/html-form.component';
import { SelectAccountFormComponent } from '@app/patient-app/form/select-account-form/select-account-form.component';

export const REGISTRY = new Map<string, Type<any>>();
// Sections
REGISTRY.set("HeaderComponent", HeaderComponent);
REGISTRY.set("FooterComponent", FooterComponent);
REGISTRY.set("ConsultNowComponent", ConsultNowComponent);
REGISTRY.set("SymptomsSectionComponent", SymptomsSectionComponent);
REGISTRY.set("OnetwothreeSectionComponent", OnetwothreeSectionComponent);
REGISTRY.set("BannerSectionComponent", BannerSectionComponent);
REGISTRY.set("NeedAssistanceSectionComponent", NeedAssistanceSectionComponent);
REGISTRY.set("TitleBarSectionComponent", TitleBarSectionComponent);
REGISTRY.set("SubProvidersSectionComponent", SubProvidersSectionComponent);
REGISTRY.set("RecentFeedsSectionComponent", RecentFeedsSectionComponent);
REGISTRY.set("RecentProvidersSectionComponent", RecentProvidersSectionComponent);
REGISTRY.set("CategorySectionComponent", CategorySectionComponent);


// Forms
REGISTRY.set("ProviderEligibilityFormComponent", ProviderEligibilityFormComponent);
REGISTRY.set("TriageFormComponent", TriageFormComponent);
REGISTRY.set("CollectPersonalInfoFormComponent", CollectPersonalInfoFormComponent);
REGISTRY.set("EmergencyFormComponent", EmergencyFormComponent);
REGISTRY.set("NextAppointmentInfoFormComponent", NextAppointmentInfoFormComponent);
REGISTRY.set("RequestAppointmentFormComponent", RequestAppointmentFormComponent);
REGISTRY.set("MedicalProfileFormComponent", MedicalProfileFormComponent);
REGISTRY.set("HtmlFormComponent", HtmlFormComponent);
REGISTRY.set("SelectAccountFormComponent", SelectAccountFormComponent);


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // store services
  appConfig: IAppConfig;
  state: Array<any> = [];

  isShowMobileDownloadBar: boolean = true;

  constructor(private _router: Router, private _http: HttpClient, private _route: ActivatedRoute, private _componentFactoryResolver: ComponentFactoryResolver) {
    this.init(Database, Partner);
  }

  resolveComponent(component: string): Type<any> {
    return REGISTRY.get(component);
  }

  get db(): IDatabase {
    var database = JSON.parse(localStorage.getItem('database'));
    return database;
  }

  getProvider(id: number): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/provider`, { params: { id: id } });
  }

  getProvidersByParent(parentId: number) {
    return this.__getProviders().pipe(map((val) => {
      val.data = _.filter(val.data, (p) => p.parentId == parentId);
      return val;
    }));
  }

  getProviders():Observable<any> {
    return this.__getProviders().pipe(map((val) => {
      val.data = _.filter(val.data, (p) => p.parentId == -1);
      return val;
    }));
  }

  init(database: any, appConfig: any) {

    database = this.__populateRandomData(database);

    // store database in local storage
    localStorage.setItem('database', JSON.stringify(database));

    this.appConfig = appConfig;
    this.setTheme(appConfig.theme);
  }

  setTheme(theme: ITheme):void {
    Object.keys(theme).forEach((prop) => {
      document.documentElement.style.setProperty(prop, theme[prop]);
    });
  }

  loadComponent<T>(container: ViewContainerRef, componentName: string): T {
    let component = this.resolveComponent(componentName);
    if (component) {
      const factory = this._componentFactoryResolver.resolveComponentFactory(component);
      const refComponent = container.createComponent(factory);
      return refComponent.instance;
    } else {
      console.log('cannot resolve ', componentName);
      return null;
    }
  }

  any(source: any[], count: number) {
    var result = [];

    for (var i = 0; i < source.length; i++) {

      if (result.length >= count) break;

      var need = count - result.length;
      if (Math.floor(Math.random() * (source.length - i - need)) == 0) {
        result.push(source[i]);
      }
    }

    return result;
  }

  private __populateRandomData(database: IDatabase) {
    let providers = Database.providers;

    let countPatients = this.__random(5, 8);
    let countDoctors = this.__random(3, 5);
    let countAppointments = this.__random(20, 50);

    var patients = [], doctors = [], appointments = [];

    // generate patients
    for (var i = 0; i < countPatients; i++) {
      patients.push(this.__randomUser());
    }

    // generate doctors
    for (var i = 0; i < countDoctors; i++) {
      var doctor = this.__randomUser();
      doctor.role = UserRole.doctor;
      doctors.push(doctor);
    }

    // generate appointments
    const min15 = 1000 * 60 * 15;
    const hour1 = min15 * 4;
    for (var i = 0; i < countAppointments; i++) {
      let appointment = this._randomAppointment(patients, doctors, database.providers);
      var milliseconds = Date.now() + hour1 * 2 - (Math.random() * min15 * i);
      appointment.startAt = new Date(milliseconds);
      appointment.endAt = new Date(milliseconds + min15);
      appointments.push(appointment);
    }

    database.appointments.push(...appointments);
    database.users.push(...patients, ...doctors);

    // fix one user so that we can use it to login
    database.users[0].username = 'test';
    database.users[0].password = 'test';

    return database;
  }

  private __random(min:number, max:number):number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private __randomItem<T>(items: T[]):T {
    return items[this.__random(0, items.length - 1)];
  }

  private __randomUser(): IUser {

    let firstName = this.__randomItem(Generator.firstNames);
    let lastName = this.__randomItem(Generator.firstNames);
    let domain = this.__randomItem(Generator.businesses).replace(' ', '').toLowerCase();
    let gender = this.__randomItem(Generator.gender);

    let user: IUser = {
      "id": this.__random(10000, 99999),
      "birthdate": this.__randomDate(),
      "firstName": firstName,
      "lastName": lastName,
      "email": `${firstName}.${firstName}@${domain}`,
      "contact": this.__random(80000000, 99999999).toString(),
      "gender": gender,
      "nationalId": this.__random(10000000, 99999999).toString(),
      "password": this.__randomItem(Generator.adjectives),
      "username": this.__randomItem(Generator.nouns),
      "imgUrl": this.__randomPortraitUrl(gender == 'Male'),
      "role": UserRole.patient
    };

    return user;
  }

  private _randomAppointment(patients: IUser[], doctors: IUser[], providers: IProvider[]) {

    let appointment: IAppointment = {
      "id": this.__random(10000, 99999),
      "patientId": this.__randomItem(patients).id,
      "doctorId": this.__randomItem(doctors).id,
      "episodeId": this.__random(10000, 99999),
      "providerId": this.__randomItem(providers).id,
      "startAt": new Date(),
      "endAt": new Date(),
      "status": AppointmentStatus.Open
    }

    return appointment;
  }

  private __randomDate(): Date {
    return new Date(
      this.__random(1959, 2002),
      this.__random(1, 12),
      this.__random(1, 28),
      0, 0, 0, 0
    );
  }

  private __randomPortraitUrl(isMale: boolean): string {

    let id = this.__random(1, 99);
    let gender = isMale ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`
  }

  private __getProviders(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/providers`);
  }
}
