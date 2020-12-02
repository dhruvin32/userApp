import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const window: any;

@Injectable({ 
  providedIn: 'root' 
})
export class ConnectionService {
  private internalConnectionChanged = new Subject<boolean>();

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  get isOnline() {
    return !!window.navigator.onLine;
  }

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus() {
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}

/*import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService{
  public connectionStatus:string = "";
  
  constructor() { 
    
    addEventListener("online",(e)=>{
      this.connectionStatus = "online";
    });

    addEventListener("offline",(e)=>{
      this.connectionStatus = "offline";
    });
  }
  
}*/
