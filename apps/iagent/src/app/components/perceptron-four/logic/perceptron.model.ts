/**
 * Copyright (c) 2022 Banco de Bogotá. All Rights Reserved.
 * <p>
 * iagent was developed by Core Banking BDB.
 * <p>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * proprietary and confidential. For use this code you need to contact to
 * Banco de Bogotá and request exclusive use permission.
 * <p>
 * This file was write by Jose Buelvas <jbuelva@bancodebogota.com.co>.
 */
export interface PerceptronModel {
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  expectedOutput: number;
  receivedOutput?: number;
  finalOutput?: number;
}

export interface VarModel {
  name: string;
  desc: string;
}

export interface InputModel {
  name: string;
  input: number;
}

export interface NeuronModel {
  weightNum: number;
  weights: number[];
  error: number;
  bias: number;
  trainingRate: number;
}
