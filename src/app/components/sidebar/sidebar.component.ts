import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public editState = [false, false, false];
  private projects: Item[];
  private project;

  public proList = ['Project1', 'Project2', 'Project3'];

  public startYear = 2000;
  public endYear = 2020;
  public radioValue = 'Product';
  public radioType = 'Commercial';
  public radioApp = 'Indoor';
  public radioML = 'Roof';
  public radioAcc = 'With light';

  public ts = [{filterName: 'Air flow (CFM)', filterRange: [2000, 10000], max: 10000, min: 2000},
    {filterName: 'Max power (W)', filterRange: [9.84, 96.52], max: 96.52, min: 9.84},
    {filterName: 'Sound at max speed (dBA)', filterRange: [20, 80], max: 80, min: 20},
    {filterName: 'Fan sweep diameter (in)', filterRange: [18, 96], max: 96, min: 18}];

  public ps = [{filterName: 'Firm', filterRange: [0, 10], max: 10, min: 0},
    {filterName: 'Global', filterRange: [0, 1492], max: 1492, min: 0}];

  isVisible = false;
  isConfirmLoading = false;



  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    if (this.homeService.products && this.homeService.searchItem) {
      this.project = this.homeService.searchItem;
      this.projects = this.homeService.products.filter(item => {
          return item.productType === this.project;
        }
      );
    }
    else {
      this.project = sessionStorage.getItem('searchItem');
      this.projects = JSON.parse(sessionStorage.getItem('productList'));
    }
    console.log(this.projects);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.filterPro();
    this.homeService.send();
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  reset() {
    this.ts = [{filterName: 'Air flow (CFM)', filterRange: [2000, 10000], max: 10000, min: 2000},
      {filterName: 'Max power (W)', filterRange: [9.84, 96.52], max: 96.52, min: 9.84},
      {filterName: 'Sound at max speed (dBA)', filterRange: [20, 80], max: 80, min: 20},
      {filterName: 'Fan sweep diameter (in)', filterRange: [18, 96], max: 96, min: 18}];

    this.ps = [{filterName: 'Firm', filterRange: [0, 10], max: 10, min: 0},
      {filterName: 'Global', filterRange: [0, 1492], max: 1492, min: 0}];


    this.homeService.products = JSON.parse(sessionStorage.getItem('productList'));
    this.homeService.send();
  }

  filterPro() {
    console.log(this.ts[0].filterRange[1]);
    console.log( Number(this.projects[1].airflow) <= this.ts[0].filterRange[1]);
    this.homeService.products = this.projects.filter(item => {
      return Number(item.airflow) <= this.ts[0].filterRange[1] && Number(item.airflow) >= this.ts[0].filterRange[0]
      && Number(item.powerMax) <= this.ts[1].filterRange[1] && Number(item.powerMax) >= this.ts[1].filterRange[0]
      && Number(item.soundAtMaxSpeed) <= this.ts[2].filterRange[1] && Number(item.soundAtMaxSpeed) >= this.ts[2].filterRange[0]
      && Number(item.fanSweepDiameter) <= this.ts[3].filterRange[1] && Number(item.fanSweepDiameter) >= this.ts[3].filterRange[0]
      && Number(item.modelYear) > this.startYear && Number(item.modelYear) < this.endYear
      && item.type === this.radioType && item.application === this.radioApp
      && item.accessories === this.radioAcc && item.mountingLocation === this.radioML;
    });
    console.log(this.homeService.products);
  }

  addProject() {
    this.proList.push('project' + (this.proList.length + 1).toString());
    this.editState.push(false);
  }
  deleteProject(key) {
    this.proList.splice(key, 1);
    this.editState.splice(key, 1);
  }
  deleteAll() {
    this.proList = [];
    this.editState = [];
  }

  editPro(key) {
    this.editState[key] = !this.editState[key];
  }

  navigateToCompare() {
    this.router.navigate(['/compare']);
  }
}
