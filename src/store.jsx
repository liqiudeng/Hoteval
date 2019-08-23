import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "search") {
    return { ...state, searchQuery: action.typedSearch };
  }
  if (action.type === "username") {
    return {
      ...state,
      username: action.username
    };
  }
  return state;
};
const store = createStore(
  reducer,
  {
    searchQuery: "",
    username: undefined
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
