import { Component, OnInit, ViewChild } from '@angular/core';
import { PerceptronModel, InputModel, VarModel, NeuronModel } from './logic/perceptron.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component( {
  selector: 'agent-perceptron',
  templateUrl: './perceptron.component.html',
  styleUrls: [ './perceptron.component.scss' ]
} )
export class PerceptronComponent implements OnInit {
  public displayedColumns: string[];
  public gates: PerceptronModel[];
  public neuron: NeuronModel;
  public trainIteration: number;
  public playing: boolean;
  public graphTrainingRate: number[];
  public lineChartData: ChartConfiguration['data'];

  @ViewChild( BaseChartDirective ) chart?: BaseChartDirective;

  constructor( private snackbar: MatSnackBar ) {
    // Initial values
    this.trainIteration = 0;
    this.playing = false;
    this.graphTrainingRate = [];

    // Titles
    this.displayedColumns = [ 'x1', 'x2', 'output' ];

    // And Gate
    this.gates = [
      { x1: 1, x2: 1, expectedOutput: 1 },
      { x1: 1, x2: 0, expectedOutput: 0 },
      { x1: 0, x2: 1, expectedOutput: 0 },
      { x1: 0, x2: 0, expectedOutput: 0 },
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
      weightNum: 2,
      weights: [],
      bias: 0,
      trainingRate: 0.0001,
      error: 0,
      /**
       * Init with random data.
       * @param numWights weight num.
       */
      init: numWights => {
        this.neuron.weights = [];
        for ( let i = 0; i < numWights; i++ ) {
          this.neuron.weights.push( Math.random() * ( 0.5 + 0.5 ) * -0.5 );
        }
        this.neuron.bias = Math.random() * ( 0.5 + 0.5 ) - 0.5;
      },
      /**
       * Do output work.
       * @param inputs base data
       */
      output: inputs => {
        let out: number = 0;
        for ( let j in this.neuron.weights ) {
          out += this.neuron.weights[ j ] * Object.values( inputs )[ j ];
        }

        out += this.neuron.bias;

        return out;
      },
      /**
       * Method to train neuron.
       * @param gates Base data
       */
      train: gates => {
        let errorEpoch: number = 0;
        for ( let gate of gates ) {
          let error: number = gate.expectedOutput - this.neuron.output( gate );
          errorEpoch += Math.abs( error );
          this.neuron.weightAdjust( error, gate );
        }
        this.neuron.error = errorEpoch / gates.length;

        return errorEpoch;
      },
      /**
       * Correct error in training.
       * @param error current error
       * @param currentInput current base data
       */
      weightAdjust: ( error, currentInput ) => {
        for ( let i = 0; i < this.neuron.weights.length; i++ ) {
          let adjust = error * this.neuron.trainingRate * Object.values( currentInput )[ i ];

          // Adjust weights
          this.neuron.weights[ i ] += adjust;
        }
        let adjust = error * this.neuron.trainingRate;
        this.neuron.bias += adjust;
      },
      /**
       * Do correction of bias
       * @param val.expectedOutput val.
       */
      steppedCorrection: val => val < 0 ? 0 : 1
    };
  }

  ngOnInit(): void {
    // Start random values
    this.neuron.init( this.neuron.weightNum );
  }

  public startSimulation(): void {
    this.playing = true;

    // Start training
    this.neuron.train( this.gates );
    this.lineChartData.datasets[ 0 ].data.push( this.neuron.error );
    this.lineChartData.labels!.push( '' );
    if ( this.trainIteration % 10 == 0 ) {
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
    this.neuron.init( this.neuron.weightNum );
    this.playing = false;
    this.trainIteration = 0;
    this.lineChartData.datasets[ 0 ].data = [];
    this.lineChartData.labels = [];
    this.neuron.error = 0;

    this.snackbar.open( "Valores reiniciados", "Aceptar" );
  }

  public errorPer(): string {
    return (this.neuron.error * 90).toFixed(2);
  }
}
