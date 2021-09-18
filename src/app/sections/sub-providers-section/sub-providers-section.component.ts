import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/data.service';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-sub-providers-section',
  templateUrl: './sub-providers-section.component.html',
  styleUrls: ['./sub-providers-section.component.scss']
})
export class SubProvidersSectionComponent extends Section implements OnInit {

  providers:Array<any> = [];

  constructor(dataService: DataService, route: ActivatedRoute, private _router: Router) {
    super();

    const providerId = route.snapshot.params.pid;
    dataService.getProvidersByParent(providerId).toPromise().then((response) => {
      this.providers = response.data;
      console.log('SubProvidersSectionComponent', this.providers);
    });
  }

  ngOnInit(): void {
  }

  onJourneyStart($event: any, provider): boolean {
    this._router.navigate(['provider', provider.id, 'journey', 'start']);

    return false;
  }

}
