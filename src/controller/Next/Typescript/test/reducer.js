import {entityType} from "./module";
import {getCommonState, handleCommonState} from "reactcoregk/store/reducer";

const initialState = getCommonState();

// const Item = DefaultReducer(entityType)
const Test = (state = initialState, action) => {
  const actionEntity = action.type.split(".")[0]

  if (actionEntity !== entityType) return state
  const actionType = action.type.split(".")[1]

  return  handleCommonState(state, actionType, action, "id");
};

export default Test;
