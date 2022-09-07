import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PerceptronComponent } from './components/perceptron/perceptron.component';
import { IntelligentAgentComponent } from './components/intelligent-agent/intelligent-agent.component';

@NgModule( {
  declarations: [
    AppComponent,
    PerceptronComponent,
    IntelligentAgentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
  constructor( private library: FaIconLibrary ) {
    library.addIconPacks( far, fas, fab );
  }
}
