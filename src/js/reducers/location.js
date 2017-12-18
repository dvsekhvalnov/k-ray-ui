import {
  UPDATE_LOCATION,
} from '../actions';

const initial = {
  url: "",
  search: "",
}

export default (state = initial, action) => {
  switch (action.type) {
    case UPDATE_LOCATION : {
      return {
        ...state,
        url: action.url,
        search: action.search,
      }
    }

    default:
      return state;

  }
};
