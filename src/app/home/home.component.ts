import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  addDebtForm!: FormGroup
  isChooseFriend:any = false;
  constructor(
    private form: FormBuilder
  ) { }
  ngOnInit(): void {
    this.addDebtForm = this.form.group({
      title: [''],
      type: [''],
      amount: [''],
      forma: [''],
      friend: [''],
      note: [''],
    })
  }
  addDebt() {
    console.log(this.addDebtForm.value)
  }
}
