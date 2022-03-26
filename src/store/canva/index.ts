import { Module } from 'vuex';
import { ApplicationState } from '..';
import { ICanvaState, canvaState as state } from './state';
import { canvaMutations as mutations } from './mutations';

export const canva: Module<ICanvaState, ApplicationState> = {
  namespaced: true, state, mutations,
}