import { Injectable } from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http :HttpClient) { }
  postService(data:any){
    return this.http.post<any>(' http://localhost:3000/service', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getService(){
    return this.http.get<any>('http://localhost:3000/service')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateService(data:any,id:number){
    return this.http.put<any>('http://localhost:3000/service/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteService(id:number){
    return this.http.delete<any>('http://localhost:3000/service/' +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
