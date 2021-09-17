import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/data.service';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-sub-providers-section',
  templateUrl: './sub-providers-section.component.html',
  styleUrls: ['./sub-providers-section.component.scss']
})
export class SubProvidersSectionComponent extends Section implements OnInit {

  providers: [] = [];

  constructor(dataService: DataService, route: ActivatedRoute) {
    super();
    
    const providerId = route.snapshot.params.pid;
    dataService.getProvidersByParent(providerId).toPromise().then((response) => {
      this.providers = response.data;
    });
  }

  ngOnInit(): void {
  }

}
