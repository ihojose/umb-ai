import { Component, OnInit, ViewChild } from '@angular/core';
import { PerceptronModel, InputModel, VarModel, NeuronModel } from './logic/perceptron.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component( {
  selector: 'agent-perceptron',
  templateUrl: './perceptron-four.component.html',
  styleUrls: [ './perceptron-four.component.scss' ]
} )
export class PerceptronFourComponent implements OnInit {
  public displayedColumns: string[];
  public gates: PerceptronModel[];
  public neuron: NeuronModel;
  public trainIteration: number;
  public playing: boolean;
  public graphTrainingRate: number[];
  public lineChartData: ChartConfiguration['data'];
  public inputs: { x1: number, x2: number, x3: number, x4: number };
  public result: number = 0;

  @ViewChild( BaseChartDirective ) chart?: BaseChartDirective;

  constructor( private snackbar: MatSnackBar ) {
    // Initial values
    this.trainIteration = 0;
    this.playing = false;
    this.graphTrainingRate = [];
    this.inputs = { x1: 0, x2: 0, x3: 0, x4: 0 };

    // Titles
    this.displayedColumns = [ 'x1', 'x2', 'x3', 'x4', 'output', 'result' ];

    // And Gate
    this.gates = [
      { x1: -1, x2: -1, x3: -1, x4: -1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: -1, x3: -1, x4: 1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: -1, x3: 1, x4: -1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: -1, x3: 1, x4: 1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: 1, x3: -1, x4: -1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: 1, x3: -1, x4: 1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: 1, x3: 1, x4: -1, expectedOutput: -1, finalOutput: 0 },
      { x1: -1, x2: 1, x3: 1, x4: 1, expectedOutput: -1, finalOutput: 0 },
      { x1: 1, x2: -1, x3: -1, x4: -1, expectedOutput: -1, finalOutput: 0 },
      { x1: 1, x2: -1, x3: -1, x4: 1, expectedOutput: 1, finalOutput: 0 },
      { x1: 1, x2: -1, x3: 1, x4: -1, expectedOutput: 1, finalOutput: 0 },
      { x1: 1, x2: -1, x3: 1, x4: 1, expectedOutput: 1, finalOutput: 0 },
      { x1: 1, x2: 1, x3: -1, x4: -1, expectedOutput: 1, finalOutput: 0 },
      { x1: 1, x2: 1, x3: -1, x4: 1, expectedOutput: 1, finalOutput: 0 },
      { x1: 1, x2: 1, x3: 1, x4: -1, expectedOutput: 1, finalOutput: 0 },
      { x1: 1, x2: 1, x3: 1, x4: 1, expectedOutput: 1, finalOutput: 0 },
    ];

    // Line chart init
    this.lineChartData = {
      datasets: [ {
        data: this.graphTrainingRate,
        label: '% Error',
        borderColor: 'rgb(161,25,25)',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        fill: 'origin',
        backgroundColor: 'transparent'
      } ],
      labels: []
    };

    // Neuron definition
    this.neuron = {
      weightNum: 4,
      weights: [ 1.2, 1.2, 1.2, 1.2 ],
      bias: 0,
      trainingRate: 0.0001,
      error: 0
    };
  }

  ngOnInit(): void {
    // Start random values
    this.init( this.neuron.weightNum );
  }

  /**
   * Do correction of bias
   * @param val.expectedOutput val.
   */
  public steppedCorrection( val: number ): number {
    return val < 0 ? -1 : 1;
  }

  /**
   * Do output work.
   * @param gate base data
   */
  output( gate: PerceptronModel ): number {
    let out: number = 0;
    let sumToTanh: number = 0;
    for ( let j in this.neuron.weights ) {
      sumToTanh += Object.values( gate )[ j ] * this.neuron.weights[ j ];
    }

    out += Math.tanh( sumToTanh - this.neuron.error );
    gate.finalOutput = out;

    return out;
  }

  /**
   * Init with random data.
   * @param numWights weight num.
   */
  init( numWights: number ) {
    this.neuron.weights = [];
    for ( let i = 0; i < numWights; i++ ) {
      this.neuron.weights.push( Math.abs( Math.random() * -0.5 ) );
    }
    this.neuron.bias = Math.random() * -0.5;
  }

  /**
   * Correct error in training.
   * @param error current error
   * @param currentInput current base data
   */
  weightAdjust( error: number, currentInput: PerceptronModel ): void {
    for ( let i = 0; i < this.neuron.weightNum; i++ ) {
      let adjust = error * this.neuron.trainingRate * Object.values( currentInput )[ i ];

      // Adjust weights
      this.neuron.weights[ i ] += adjust;
    }
    let adjust = error * this.neuron.trainingRate;
    this.neuron.bias += adjust;
  }

  /**
   * Method to train neuron.
   * @param gates Base data
   */
  public train( gates: PerceptronModel[] ) {
    let errorEpoch: number = 0;
    for ( let gate of gates ) {
      let error: number = ( gate.expectedOutput - this.output( gate ) ) / gate.expectedOutput;
      errorEpoch += Math.abs( error );
      this.weightAdjust( error, gate );
    }
    this.neuron.error = errorEpoch / gates.length;

    return errorEpoch;
  }

  public doTest(): void {

    // Gates
    let toRes: number = 0;

    for ( let i = 0; i < this.neuron.weightNum; i++ ) {
      toRes += this.neuron.weights[ i ] * Object.values( this.inputs )[ i ];
    }

    this.result = Math.tanh( toRes - this.neuron.error );
  }

  public startSimulation(): void {
    this.playing = true;

    // Start training
    this.train( this.gates );
    this.lineChartData.datasets[ 0 ].data.push( this.neuron.error );
    this.lineChartData.labels!.push( '' );
    if ( this.trainIteration % 20 == 0 ) {
      this.chart!.ngOnChanges( {} );
    }

    // Repeat always while simulator is playing
    setTimeout( () => {
      if ( this.playing ) {
        this.startSimulation();
        this.trainIteration += 1;
      }
    }, 10 );
  }

  public stopSimulation(): void {
    this.playing = false;
  }

  public reset(): void {
    this.init( this.neuron.weightNum );
    this.playing = false;
    this.trainIteration = 0;
    this.lineChartData.datasets[ 0 ].data = [];
    this.lineChartData.labels = [];
    this.neuron.error = 0;

    this.snackbar.open( "Valores reiniciados", "Aceptar", { duration: 5000 } );
  }

  public errorPer(): string {
    return ( this.neuron.error * 100 ).toFixed( 2 );
  }

  public precision(): string {
    return ( 100 - ( this.neuron.error * 100 ) ).toFixed( 2 );
  }

  public toFix( val: number, fraction: number = 2 ): string {
    return val.toFixed( fraction );
  }

  public validate( a: number, b: number ): boolean {
    return ( a > 0 && b > 0 ) || ( a < 0 && b < 0 );
  }
}
