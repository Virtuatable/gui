import { CreatedResponse } from "@/interfaces/api/CreatedResponse";
import { ICredentials } from "@/interfaces/ICredentials";
import ISession from "@/interfaces/ISession";
import { ActionTree } from "vuex";
import { ApplicationState } from "..";
import { ActionTypes } from "./enums";
import { IState } from "./state";
import router from '@/router'
import { Action } from "vuex-class";

export interface Actions {
  [ActionTypes.CREATE_SESSION](context: any, credentials: ICredentials): Promise<Array<ISession>>
}

export const actions: ActionTree<IState, ApplicationState> & Actions = {
  [ActionTypes.CREATE_SESSION](_context: any, credentials: ICredentials) {
    console.log(credentials);
    return new Promise((resolve: any) => {
      setTimeout(() => {
        const response: CreatedResponse<ISession> = {
          message: 'created',
          item: {
            session_id: 'test_session_id',
            account: {
              username: credentials.username
            }
          },
        }
        localStorage.setItem('session_id', 'test_session_id');
        router.push('/campaigns');
        resolve(response);
      }, 1000)
    })
  },
  [ActionTypes.DELETE_SESSION]() {
    localStorage.removeItem('session_id')
    router.push("/login")
  }
}