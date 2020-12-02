import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'userApp';

  constructor(private swUpdate:SwUpdate){
    
  }

  ngOnInit():void{
    this.reloadCache();
  }

  reloadCache(){
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        if(confirm("new version available")){
          window.location.reload();
        }
      });
    }
  }
}
