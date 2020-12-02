import { Component, OnInit } from '@angular/core';
import { User } from '../module/user';
import { UserService } from '../services/user.service';
import { ConnectionService } from '../services/connection.service';
import { IndexedDBService } from '../services/indexed-db.service';
//import { HttpClient } from '@angular/common/http';  
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:User[];
  public tempName:string = "";
  public status:string = "";
  constructor(
    private userService:UserService, 
    private readonly connectionService:ConnectionService,
    private indDB:IndexedDBService,
    //private httpClient:HttpClient
  ) { 
  
  }
  
  ngOnInit(): void {
    /*addEventListener("online", (e) => {
      this.status = "online";
    });

    addEventListener("offline",(e) => {
      this.status = "offline";
    });*/
    this.registerToEvents(this.connectionService);
    this.users = this.userService.getItems();
    //this.tempName = JSON.stringify(this.userService.getMasterData());
  }


  getMasterdata(){
    //return this.httpClient.get('https://qa.mosip.net/v1/masterdata/individualtypes')
  }

  onAdd(firstName:string){
    //alert(firstName);

    let newData:User = {
      firstName:'dhruvin',
      addedStatus: 'online'
    };
    if(firstName){
      newData.firstName = firstName;
      newData.addedStatus = this.status;
    }
    //console.log(newData);

    if(this.status === "online"){
      this.userService.addToList(newData);
    }
    else{
      this.indDB.addUser(newData);
    }
  }

  private registerToEvents(connectionService: ConnectionService) {
    connectionService.connectionChanged.subscribe(online => {
      if (online) {
        this.status = "online";
        console.log('went online');
        console.log('sending all stored items');

        this.sendOnline();
        
      } else {
        this.status = "offline";

        console.log('went offline, storing in indexdb');
                
      }
    });
  }

  private async sendOnline(){
    const tempUsers: User[] = await this.indDB.getAllUsers();

    tempUsers.forEach((user:User) => {
      console.log(user.firstName);
      this.users.push(user);
      this.indDB.delete(user.firstName);
    })
  }
}
