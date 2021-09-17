import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/data.service';
import { Form, FormEvent } from '@app/interfaces';

@Component({
  selector: 'app-provider-eligibility-form',
  templateUrl: './provider-eligibility-form.component.html',
  styleUrls: ['./provider-eligibility-form.component.scss']
})
export class ProviderEligibilityFormComponent implements Form, OnInit {


  form: FormGroup;

  constructor(private _dataService: DataService, private _route: ActivatedRoute) {

    // get the patient eligibility requirements from the group settings

  }

  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  requirements: Array<any> = [];

  evaluate(config: any): boolean {
    Object.assign(this, config);

    return true;
  }

  ngOnInit(): void {
     this.form = new FormGroup({
       policyNumber: new FormControl()
     });
  }


  onNext($event): void {
    this.nextHandler.emit(new FormEvent(this));
  }

  onBack($event): void {
    this.backHandler.emit(new FormEvent(this));
  }

  onCancel($event): void {
    this.cancelHandler.emit(new FormEvent(this));
  }

}
