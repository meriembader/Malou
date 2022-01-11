import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})



export class ApiCallService {
  constructor(private httpclient: HttpClient){ }

  getPostByDay(day) {
    return this.httpclient.get(environment.apiURL + 'postsByDay?day=' + day, {headers}).toPromise();
  }
  
}

