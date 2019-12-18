import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware =
  process.env.NODE_ENV !== "production"
    ? // eslint-disable-next-line global-require, import/no-extraneous-dependencies
      [require("redux-immutable-state-invariant").default(), thunk]
    : [thunk];

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && compose; // eslint-disable-line no-undef

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
};

export default configureStore;
