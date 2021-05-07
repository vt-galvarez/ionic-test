import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CodePush } from '@ionic-native/code-push/ngx';
import { SandboxService } from './home/sandbox.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HomePageModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HomePageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CodePush, HttpClientModule, SandboxService],
  bootstrap: [AppComponent],
}) 
export class AppModule {}
