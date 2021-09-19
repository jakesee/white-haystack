import { EventEmitter, Component, Input, OnInit, Output, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-tag-control',
  templateUrl: './tag-control.component.html',
  styleUrls: ['./tag-control.component.scss']
})
export class TagControlComponent implements OnInit {


  @ViewChild('checkbox') checkbox: ElementRef;

  @Input() label: string = "Sample Label";
  @Input() value: string = "Sample Value";

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange($event: any) {

    this.checkbox.nativeElement.checked = !this.checkbox.nativeElement.checked;

    this.change.emit($event);
  }

  get isChecked(): boolean {
    return this.checkbox?.nativeElement?.checked;
  }
}
