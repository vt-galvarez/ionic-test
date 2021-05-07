import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HTTPResponse } from '@ionic-native/http/ngx';
import { SandboxService } from './sandbox.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @Input() prices :any[] = [];

  isCI: boolean = false;
  is24hs: boolean = false;
  is48hs: boolean = false;
  

  @Output() filterUpdateEvent : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    
  }


  updateFilters(){
    this.filterUpdateEvent.emit({isCI: this.isCI, is24hs: this.is24hs, is48hs: this.is48hs})
  }


}
