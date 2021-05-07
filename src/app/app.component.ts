import { Component, OnInit } from '@angular/core';
import { CodePush } from '@ionic-native/code-push/ngx';
import { HTTPResponse } from '@ionic-native/http/ngx';
import { SandboxService } from './home/sandbox.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  prices :any[] = [];
  isCI: boolean = false;
  is24hs: boolean = false;
  is48hs: boolean = false;

  constructor(private codePush: CodePush, public sandboxService: SandboxService, private platform: Platform) {
    this,platform.ready().then( () => {
      this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
      const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
      this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));

    });


    this.refreshPrices();
  }

  interval: NodeJS.Timeout;

  ngOnInit(): void {
    this.sandboxService.refreshToken();
    this.refreshPrices();
    this.interval = setInterval(()=>{
      this.refreshPrices();
    }, 1000);
  }
  
  refreshPrices() {
    this.sandboxService.getTitulosPublicos(this.isCI, this.is24hs, this.is48hs).subscribe( (response: any) => {
      this.prices = response;
      console.log(JSON.stringify(this.prices));
    },(response )=>{
      console.log(JSON.stringify(response));
    });
  }

  updateFilters(filters){
    this.isCI = filters.isCI;
    this.is24hs = filters.is24hs;
    this.is48hs = filters.is48hs;
  }
  
}
