import { Injectable } from '@angular/core';
import {Item} from '../models/item';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project';
import {Current} from '../models/current';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public products: Item[];
  public searchItem: string;
  public projects: Project[];

  public currentItems: Current[];

  constructor(private http: HttpClient) { }

  productsListener = new Subject<any>();

  projectsListener = new Subject<any>();

  currentListener = new Subject<any>();

  getProductsListener() {
    return this.productsListener.asObservable();
  }

  send() {
    this.productsListener.next(this.products);
  }

  sendProject() {
    this.projectsListener.next(this.projects);
  }

  getProjectListener() {
    return this.projectsListener.asObservable();
  }

  sendCurrent() {
    this.currentListener.next(this.currentItems);
  }

  getCurrent() {
    return this.currentListener.asObservable();
  }

  getProject(): Project[] {
    this.http.get<Project[]>(BACKEND_URL + `/getAllProject`).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.projects = response;
        }
        else {
          this.projects = [];
        }
      }
    );
    return this.projects;
  }

  addProject(projectName: string) {
    this.http.get<Project>(BACKEND_URL + `/addProject?projectName=${projectName}`).subscribe(
      response => {
        if (!this.projects) {
          console.log('1111');
          this.projects = [];
        }
        this.projects.push(response);
        console.log('success to add ');
    },
      () => {
        console.log('fail to add');
      });
    this.sendProject();
  }

  deleteProject(projectId: number) {
    this.http.get(BACKEND_URL + `/deleteProject?projectId=${projectId}`).subscribe(
      () => {
        console.log('success to delete ');
      },
      () => {
        console.log('fail to delete');
      }
    );
    this.sendProject();
  }

  deleteAll() {
    this.projects = [];
    this.http.get(BACKEND_URL + `/deleteAllProject`).subscribe(
      () => {
        console.log('success to delete ');
      },
      () => {
        console.log('fail to delete ');
      }
    );
    this.sendProject();
  }

  addProductToProject(projectId: number, productId: number) {
    this.http.get(BACKEND_URL + `/addProductToProject?productId=${productId}&projectId=${projectId}`).subscribe(
      () => {
        console.log('success');
      }
    );
  }

  getProductFromProject(projectId: number){
    this.http.get<Current[]>(BACKEND_URL + `/getProject?projectId=${projectId}`).subscribe(
      response => {
        console.log('success');
        this.currentItems = response;
        console.log(this.currentItems);
        this.sendCurrent();
      },
      () => {
        console.log('fail');
      }
    );
    this.sendCurrent();
  }

  deleteProductFromProject(projectId: number, productId: number) {
    this.http.get<Current[]>(BACKEND_URL + `/deleteProductFromProject?projectId=${projectId}&productId=${productId}`).subscribe(
      () => {
        console.log('success');
      },
      () => {
        console.log('fail');
      }
    );
    this.sendCurrent();
  }
}

