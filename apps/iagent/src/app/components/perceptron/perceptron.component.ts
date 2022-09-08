import { Component, OnInit } from '@angular/core';
import { AndModel, InputModel, VarModel } from './logic/and.model';

@Component( {
  selector: 'agent-perceptron',
  templateUrl: './perceptron.component.html',
  styleUrls: [ './perceptron.component.scss' ]
} )
export class PerceptronComponent implements OnInit {
  public displayedColumns: string[];
  public gates: AndModel[];
  public displayedVars: string[];
  public vars: VarModel[];
  public displayedInputs: string[];
  public inputs: InputModel[];

  constructor() {
    // Titles
    this.displayedColumns = [ 'x1', 'x2', 'output' ];
    this.displayedVars = [ 'name', 'desc' ];
    this.displayedInputs = [ 'name', 'input' ];

    // Vars
    this.vars = [
      { name: '∅', desc: 'Error' },
      { name: 'E', desc: 'Factor de aprendizaje' },
      { name: 'X', desc: 'Entrada' },
      { name: 'W', desc: 'Peso' },
      { name: 'f()', desc: 'Tanh() // Función sigmoidea -> back propagación.' },
    ];

    this.inputs = [
      { name: '∅', input: 1 },
    ];

    // And Gate
    this.gates = [
      { x1: 1, x2: 1, output: 1 },
      { x1: 1, x2: -1, output: -1 },
      { x1: -1, x2: 1, output: -1 },
      { x1: -1, x2: -1, output: -1 },
    ];
  }

  ngOnInit(): void {
  }


}
