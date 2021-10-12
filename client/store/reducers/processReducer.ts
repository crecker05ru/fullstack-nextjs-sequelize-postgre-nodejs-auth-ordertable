//initialiaze the function with two arguments
import { ProcessState } from './../../types/process';

const initialState : ProcessState = {
  encrypt: [],
  text: [],
  cypher: []

}
export const processReducer = (state = initialState, action) => {
    switch (action.type) {
      //returns updated state
      case "PROCESS":
        return { ...action.payload };
      //else the current state is retained
      default:
        return state;
    }
  };