import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mainservice } from '../services/main.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  addFriendForm!: FormGroup;
  isAddSocial: any = false;
  linkList: any = [];
  friends: any = [];
  friendDetail: any = {};
  numLink = 0;
  bootstrap: any = {};
  modal: any = {};
  win = window as any;
  isLoading = false;
  constructor(
    private form: FormBuilder,
    private service: Mainservice
  ) { }
  ngOnInit(): void {
    this.addFriendForm = this.form.group({
      email: [''],
      name: [''],
      phone: [''],
      money: [''],
      description: [''],
      link: [''],
    })
    this.getFriends();
  }
  friendHanle(id: any = null) {
    let inputValues: any = [];
    Array.from(document.querySelectorAll('input[name="link"]')).forEach((e: any) => {
      inputValues = [...inputValues, e.value];
      this.addFriendForm.patchValue({ link: inputValues });
    });
    let data = { ...this.addFriendForm.value };
    if (data.link.length == 0 || data.link.filter((e: any) => e !== '').length == 0) {
      delete data.link;
    }
    if (!id) {
      this.service.callApi('/friend/add', data).subscribe({
        next: async (res: any) => {
          if (res.status) {
            console.log('add friend ok');
          } else {
            console.log('add friend failed');
          }
        },
        error: async (err: any) => {
          console.log('add friend', err)
        }
      })
    } else {
      this.service.callApi('/friend/update', { id, data }).subscribe({
        next: async (res: any) => {
          if (res.status) {
            console.log('update friend ok');
          } else {
            console.log('update friend failed');
          }
        },
        error: async (err: any) => {
          console.log('update friend', err)
        },
        complete: () => {
          this.modalControl('#friend-handle', false)
          this.getFriends();
        }
      })
    }
  }

  getFriends() {
    this.isLoading = true;
    this.service.callApi('/friend/list', {}).subscribe({
      next: async (res: any) => {
        if (res.status) {
          this.friends = res.data.map((e: any) => {
            e.link = e.link.map((v: any) => {
              let newLink;
              if (v.includes('facebook')) {
                newLink = { ref: v, type: 'fb', cls: 'fa-facebook text-primary' }
              } else if (v.includes('instagram')) {
                newLink = { ref: v, type: 'ig', cls: 'fa-instagram text-warning' }
              } else if (v.includes('tiktok')) {
                newLink = { ref: v, type: 'tt', cls: 'fa-tiktok' }
              }
              return newLink;
            })
            return e;
          })
          console.log('data', this.friends);
          console.log('add friend ok');
        } else {
          console.log('add friend failed');
        }
      },
      error: async (err: any) => {
        console.log('add friend', err)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  modalControl(id: any, status: boolean = true) {
    this.modal[id] = this.modal[id] ?? new this.win.bootstrap.Modal(id);
    if (status) {

      this.modal[id].show();
    } else {
      this.modal[id].hide();
    }

  }
  test: any = [];
  getFriend(id: any) {
    this.service.callApi('/friend/get', { id }).subscribe({
      next: async (res: any) => {
        if (res.status) {
          this.friendDetail = res.data;
          console.log(res.data)
          if (res.data.link.length > 0) {
            this.linkList = res.data.link.map((e: any, i: any) => {
              return {
                name: i,
                value: e
              }
            })
          }
          this.addFriendForm.patchValue({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            money: res.data.money,
          })
          this.modalControl('#friend-handle')
        } else {
          console.log('get friend', res.message)
        }
      },
      error: (error) => {
        console.log('get friend', error.message)
      },
    })
  }

  delete(ids: any) {
    this.service.callApi('/friend/delete', { ids }).subscribe({
      next: async (res: any) => {
        if (res.status) {
          this.friends = this.friends.filter((e: any) => !ids.includes(e.id));
        } else {
          console.log('add friend failed');
        }
      },
      error: async (err: any) => {
        console.log('add friend', err)
      }
    })
  }

  addLink() {
    this.numLink = this.numLink + 1;
    this.linkList = Array(this.numLink).fill(0).map((x, i) => {
      let link = {
        name: i,
        value: ''
      }
      return link;
    })
    console.log(this.linkList)
  }
}
