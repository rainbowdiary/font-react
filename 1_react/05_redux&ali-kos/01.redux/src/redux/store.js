import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
let store = null;
if (process.env.NODE_ENV === 'development') {
  store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
} else {
  store = createStore(reducers, applyMiddleware(thunk))
}
export default store;