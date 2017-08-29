import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { User } from './user';
import { NewUserComponent } from './new-user/new-user.component';

import { UserService } from './user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styles: [`
    .userContainer {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }
    .position {
      position: absolute;
      margin-top: 7px;
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      height: 50px;
    }
    h5 {
      margin: 10px;
      color: #000;
    }
    select {
      width: 150px !important;
      margin-left: 5px !important;
    }
    button {
      height: 38px !important;
      margin-left: 5px !important;
    }
  `]
})
export class UserComponent implements OnInit {

  selectedUser: User = null;
  users: User[] = [];
  loaded: boolean = false;

  constructor(
    private http: Http,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = [];
    this.selectedUser = null;
    this.loaded = false;

    this.http.get(`https://movielistback.herokuapp.com/getUsers.php`).subscribe((res) => {
      res.json().map(user => {
        let u = new User();
        u.id = parseInt(user.id);
        u.name = user.name;
        this.users.push(u);
      });
      // this.selectedUser = this.userService.selectedUser;
      this.selectedUser = this.users[0];
      this.userService.selectedUser = this.selectedUser;
      this.loaded = true;
      console.log(this.users);
    })
    
  }

  createUser() {
    let name = prompt("Enter username: ");
    let id = this.users[this.users.length-1].id + 1;

    if(name != null && name.length > 0) {
      this.http.post(`https://movielistback.herokuapp.com/addUser.php?name=${name}&id=${id}`, '').subscribe((res) => {
        console.log(res);
        let u = new User();
        u.id = id;
        u.name = name;
        this.users.push(u);
        this.selectedUser = u;
        this.loadUsers();
      });
    }
  }

  deleteUser() {
    if(this.users.length > 1) {
      this.http.post(`https://movielistback.herokuapp.com/deleteUser.php?id=${this.selectedUser.id}`, '').subscribe((res) => {
        this.loadUsers();
      });
    } else {
      alert("1 user must remain!");
    }
  }

  updateUser(event) {
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].id == event.target.value) {
        this.selectedUser = this.users[i];
        this.userService.selectedUser = this.selectedUser;
        break;
      }
    }
  }

}
