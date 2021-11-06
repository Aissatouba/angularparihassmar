import {map} from 'rxjs/operators';
import {HttpClient,} from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SousService {
  constructor(private http :HttpClient) { }

  postSous(data:any){
    return this.http.post<any>(' http://localhost:3000/sous', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getSous(){
    return this.http.get<any>('http://localhost:3000/sous')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateSous(data:any,id:number){
    return this.http.put<any>('http://localhost:3000/sous/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteSous(id:number){
    return this.http.delete<any>('http://localhost:3000/sous/' +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
