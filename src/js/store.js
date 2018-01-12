import { apiMiddleware } from "redux-api-middleware";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import createBrowserHistory from "history/createBrowserHistory"

import { UPDATE_QUERY } from "./actions";
import rootReducer from "./reducers/index"

const history = createBrowserHistory();

const configureStore = () => {
    if(process.env.NODE_ENV === "production") {
        return createStore(rootReducer, applyMiddleware(apiMiddleware));
    }

    const logger = createLogger();
    return createStore(rootReducer, applyMiddleware(apiMiddleware, logger));
};

export {
  configureStore,
  history,
};
