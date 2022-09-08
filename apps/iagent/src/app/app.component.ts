import { Component } from '@angular/core';

@Component( {
  selector: 'agent-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {

  public goRepo() {
    window.open( 'https://github.com/ihojose/umb-ai', '_blank' );
  }
}
