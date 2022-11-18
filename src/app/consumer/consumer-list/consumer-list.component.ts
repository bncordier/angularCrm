import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss'],
})
export class ConsumerListComponent implements OnInit {
  consumersObs?: Observable<Consumer[]>;
  searchCriteria: string = '';
  private subs:Subscription[]=[];


  constructor(private consumerService: ConsumerService) {}

  //pipe async that subscribes
  ngOnInit(): void {
    this.consumersObs = this.consumerService.getAll();

  }

  ngOnDestroy():void{
    this.subs.forEach(sub => sub.unsubscribe);
  }

  search(): void {
    this.consumersObs = this.consumerService.findForCriteria(
      this.searchCriteria!
    );
  }

  delete(id:number):void {
    this.subs.push(this.consumerService.deleteById(id).subscribe(
      {
        next:()=>{this.search()},
        error:(error:Error)=>{console.log(error)},
        complete:()=>{}
      }
       )
       )
      }

  }

