import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerceptronComponent } from './components/perceptron/perceptron.component';
import { IntelligentAgentComponent } from './components/intelligent-agent/intelligent-agent.component';

const routes: Routes = [ {
  path: 'perceptron',
  component: PerceptronComponent
}, {
  path: 'intelligent-agent',
  component: IntelligentAgentComponent
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: 'perceptron'
} ];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
