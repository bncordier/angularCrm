import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

//simple call to the api to get all consumers
  getAll():Observable<Consumer[]>{
    return this.http.get<Consumer[]>('/api/consumers')
  }

//search criteria
  findForCriteria(criteria:string): Observable<Consumer[]>{
    return this.http.get<Consumer[]>(`/api/consumers?q=${criteria}`);
  }

//save consumer
saveConsumer(consumer:Consumer): Observable<Consumer>{
  if(consumer.id){
    return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer)
  }else{
  return this.http.post<Consumer>('/api/consumers', consumer);
  }
}

//update consumer
getById(id:string): Observable<Consumer>{
  return this.http.get<Consumer>(`/api/consumers/${id}`);
}

//delete consumer
deleteById(id:number): Observable<Object>{
  return this.http.delete<Consumer>(`/api/consumers/${id}`);
}

}
