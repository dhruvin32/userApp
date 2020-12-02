import { Injectable } from '@angular/core';
import { User } from '../module/user';
import {ConnectionService } from '../services/connection.service';
import {IndexedDBService} from '../services/indexed-db.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db:any;

  userList = [
    {
      firstName:'dhruvin',
      addedStatus: 'default'
    },
    {
      firstName:'anuj',
      addedStatus: 'default'
    }
  ];

  constructor(
    private readonly connectionService:ConnectionService,
    private indexService:IndexedDBService,
    private httpClient:HttpClient
  ) {
    this.registerToEvents(connectionService);
    
  }

  getMasterData(){
    return this.httpClient.get('https://qa.mosip.net/v1/masterdata/individualtypes');
  }

  addToIndexedDB(newData:User){
    this.indexService.addUser(newData);
  }
  addToList(newData:User) {
    this.userList.push(newData);
    //alert(JSON.stringify(newData));
    console.log(newData);
  }

  getItems() {
    return this.userList;
  }

  private registerToEvents(connectionService: ConnectionService) {
    connectionService.connectionChanged.subscribe(online => {
      if (online) {
        //console.log('went online');
        //console.log('sending all stored items');
      } else {
        //console.log('went offline, storing in indexdb');
      }
    });
  }
}
