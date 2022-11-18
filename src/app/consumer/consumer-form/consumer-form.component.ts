
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-form',
  templateUrl: './consumer-form.component.html',
  styleUrls: ['./consumer-form.component.scss']
})
export class ConsumerFormComponent implements OnInit {

  consumerForm: FormGroup;
  private subs: Subscription[]=[];
  public idPresent: boolean = false;


  constructor(private consumerService: ConsumerService, private router:Router, private route: ActivatedRoute) {
    this.consumerForm = new FormGroup({
      id: new FormControl(),
      civility: new FormControl('', Validators.required),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),

    })
   }

  ngOnInit(): void {
    this.idPresent
    this.subs.push(this.route.paramMap.subscribe({
      next: (params) => {
        if(params.get('id') != null){
          this.idPresent = true;
          this.subs.push(this.consumerService.getById(params.get('id')!).subscribe({
          next:(data:Consumer): void=>{this.consumerForm.patchValue(data)},
          error:(error: Error)=>{console.error(error)},
          complete:()=>{}
        })
    )}},
      error: (error: Error) => {alert(error.message)},
      complete: () => {},
    }))

  }

  ngOnDestroy(): void{
    this.subs.forEach(sub => sub.unsubscribe());
  }

  validate():void{
    this.subs.push(this.consumerService.saveConsumer(this.consumerForm.value).subscribe({
      next:()=>{this.router.navigateByUrl('/consumer-list')},
      error: (error: Error) => {alert(error.message)},
      complete: ()=>{},
      }));
  }

  cancel():void{
    this.router.navigateByUrl('/consumer-list');
  }

  update():void{

  }


}
