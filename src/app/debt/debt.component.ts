import { Component } from '@angular/core';
import { Mainservice } from '../services/main.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent {
  addDebtForm!: FormGroup;
  isChooseFriend: any = false;
  friends: any = [];
  friend:any;
  constructor(
    private service: Mainservice,
    private form: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.addDebtForm = this.form.group({
      title: [''],
      type: [''],
      amount: [''],
      forma: [''],
      friend: [''],
      note: [''],
      searchFriend: ['']
    })
    this.addDebtForm.get('searchFriend')?.valueChanges.subscribe((e: any) => {
      if (e.length >= 3) {
        this.service.callApi('/friend/list', { opts: { "name": { $regex: e, $options: 'i' } } }).subscribe((e: any) => {
          console.log(e)
          this.friends = e.data;
        })
      }
    })
  }
  addDebt() {
    let data = this.addDebtForm.value;
    delete data.searchFriend;
    this.service.callApi('/debt/create', data).subscribe({
      next: async(res:any)=>{
        if(res.status){
          console.log('ok')
        }
      },
      error: ()=>{
        console.log('cc')
      }
    })
    console.log(this.addDebtForm.value)
  }
  
  chooseFriend(friend:any){
    this.addDebtForm.patchValue({friend})
    this.friend = this.friends.find((e:any)=> e.id == friend)?.email;
  }
}
