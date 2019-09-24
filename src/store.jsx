import { createStore } from "redux";
// import { ifError } from "assert";
let reducer = (state, action) => {
  if (action.type == "inStock") {
    return { ...state, inStock: action.stock };
  }
  if (action.type === "search") {
    return { ...state, searchQuery: action.typedSearch };
  }
  if (action.type === "display") {
    return { state, dispaly: "Hidden" };
  }
  if (action.type === "all-items") {
    return { ...state, allItems: action.allItems };
  }
  if (action.type === "set-messages") {
    console.log("messages", action.messages);
    return { ...state, allMessages: action.messages };
  }
  if (action.type === "set-usersrecord") {
    return { ...state, usersRecord: action.usersRecord };
  }
  if (action.type === "username") {
    return {
      ...state,
      username: action.username,
      sessionId: action.sid,
      firstName: action.firstName,
      lastName: action.lastName
    };
  }

  if (action.type === "cart") {
    return { ...state, cartList: action.cartList };
  }
  if (action.type === "addCartItems") {
    return { ...state, addToCartItems: action.addToCartItems };
  }
  if (action.type === "logout") {
    return { ...state, username: undefined };
  }
  if (action.type === "minimum-price") {
    return { ...state, min: action.price };
  }
  if (action.type === "maximum-price") {
    return { ...state, max: action.price };
  }
  if (action.type === "seller-clicked") {
    return { ...state, sellerClicked: action.sellerClicked };
  }

  if (action.type === "removeToCart") {
    let newCartNumber = action.removeItems - 1;
    // if ((newCartNumber = 0)) newCartNumber = 0;
    console.log(newCartNumber);
    return { ...state, addToCartItems: newCartNumber };
  }
  if (action.type === "checkout") {
    return { ...state, addToCartItems: action.addToCartItems };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    inStock: false,
    searchQuery: "",
    allItems: [],
    username: "",
    cartList: [],
    addToCartItems: 0,
    min: 0,
    max: 1000,
    allMessages: [],
    usersRecord: [],
    dispaly: "Hidden"
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
