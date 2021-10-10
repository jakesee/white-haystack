import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TagControlComponent } from '@app/control/tag-control/tag-control.component';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit, AfterViewInit {

  @ViewChildren('medicalCondition', { read: TagControlComponent }) tagMedicalConditions: QueryList<TagControlComponent>;

  country = "regional";
  name: string = "Guest";
  inputName: string = "";
  generatedName: string;

  recommendedDrugs: string[] = [];


  researchStatement:string = '';

  optionListBirthYear: Array<number> = [];


  // create account fields
  isShowOptional: boolean = true;

  firstName: string;
  lastName: string;
  password: string;
  phone: string;

  gender: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;

  medicalConditions: string;

  constructor() {

  }
  ngAfterViewInit(): void {

    setTimeout(() => {
      const adjectives: Array<string> = [
        "Adventurous",
        "Ambitious",
        "Courageous",
        "Adaptable",
        "Exuberant",
        "Gregarious",
        "Inquisitive",
        "Curious",
        "Diligent",
        "Generous",
        "Rational",
        "Reliable",
        "Resourceful",
        "Inventive",
        "Practical",
        "Intuitive",
      ]

      var index = ((Math.random() * adjectives.length) % adjectives.length).toFixed(0);
      this.generatedName = adjectives[index] + ' Guest';
      this.name = this.generatedName;

      //option years
      this.optionListBirthYear = [];
      for (var i = 2021; i >= 1921; i--) {
        this.optionListBirthYear.push(i);
      }
    }, 500);

  }

  onBlur($event) {
    this.name = this.inputName != "" ? this.inputName : this.generatedName;
    const nameParts = this.name.split(" ");
    this.firstName = nameParts.shift();
    this.lastName = nameParts.join(' ');

    let data = Date.now().toString();

    $event.target.blur();
  }

  onChange($event) {
    this.name = this.inputName != "" ? this.inputName : this.generatedName;
  }

  onMedicalConditionChange($event) {
    const count = Math.floor(Math.random() * 10 + 5);
    this.recommendedDrugs = this._randomDrugs(count);

    var conditions = [];

    this.tagMedicalConditions.forEach((tag) => {
      if (tag.isChecked) {
        conditions.push(tag.value);
      }
    });

    this.medicalConditions = conditions.join(', ');
  }

  onGenderAgeChange($event) {

    if (this.gender == '' || this.birthDay == null || this.birthMonth == null || this.birthYear == null) {
      this.researchStatement = "";
      return;
    }

    var spend = (Math.random() * 2000).toFixed(2);
    var saving = (Math.random() * 5 + 10).toFixed(1);
    var age = 2021 - this.birthYear;
    var lowAge = 10, highAge = 90
    if (age > 10 && age < 90) {
      lowAge = age - 5;
      highAge = age + 5;
    }

    this.researchStatement = `Our research shows that ${this.gender}s age between ${lowAge} and ${highAge} on average spend $${spend} annually on healthcare; those who are on a long term preventive care programme can save up to ${saving}%.`;
  }

  ngOnInit(): void {
  }

  private _randomDrugs(count: number):string[] {

    let drugs = [
      "Palotrim",
      "Stelasulin",
      "Gammatora",
      "Dyphypine",
      "Albendaracil",
      "Tetazepam",
      "Protozal Anatasol",
      "Trandozumab Methasin",
      "Aprevice Alemvirenz",
      "Diprobrate Acarthacin",
      "Hydrodomide",
      "Gammanavir",
      "Allesirox",
      "Feruposide",
      "Haemopan",
      "Brimostrin",
      "Acantiza Topimane",
      "Beclosyn Cogvelam",
      "Afazyme Alispizole",
      "Tretivac Allosyn",
      "Afatifine",
      "Albubyclor",
      "Lacturuvax",
      "Antinazole",
      "Actizide",
      "Crisol",
      "Ionxolol Oraderal",
      "Pulmoprotin Aldusate",
      "Tinzabital Actosine",
      "Angiobax Hyalumadin",
      "Alognuvia",
      "Estroroban",
      "Alemtumin",
      "Exunavir",
      "Aflusine",
      "Autorenol",
      "Tribrate Ibubide",
      "Ethanuma Nasamuran",
      "Panbucil Ibruterol",
      "Aquanamic Olanzazyme",
    ];

    var result = [];

    for (var i = 0; i < drugs.length; i++) {

      if (result.length >= count) break;

      var need = count - result.length;
      if (Math.floor(Math.random() * (drugs.length - i - need)) == 0) {
        result.push(drugs[i]);
      }
    }

    return result;
  }

}


