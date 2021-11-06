import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseropService {
  constructor(private http :HttpClient) { }
  postUser(data:any){
    return this.http.post<any>(' http://localhost:3000/userop', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getUser(){
    return this.http.get<any>('http://localhost:3000/userop')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
