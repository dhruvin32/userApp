import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../module/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  userList = [];

  constructor(
    private http: HttpClient
  ) {}

  addToList(newData:User) {
    this.userList.push(newData);
  }

  getItems() {
    return this.userList;
  }

}
