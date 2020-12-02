import { Injectable } from '@angular/core';
import {openDB, DBSchema, IDBPDatabase} from 'idb';
import {User} from '../module/user';
@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  private db: IDBPDatabase<MyDB>;

  constructor() {
    this.connectToDb();
   }

  async connectToDb(){
    this.db = await openDB<MyDB>("my-db",1,{
      upgrade(db){
        db.createObjectStore("user-table");
      },
    });
  }

  async addUser(newData: User){
    console.log(newData.firstName);
    return (await this.db).put("user-table",newData,newData.firstName);
  }

  async getAllUsers(){
    return (await this.db).getAll("user-table");
  }

  async delete(key){
    return (await this.db).delete("user-table",key);
  }
}

interface MyDB extends DBSchema{
  'user-table': {
    key:string;
    value:User;
  };
}

