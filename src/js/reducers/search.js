import { Base64 } from 'js-base64';
import _ from "lodash";
import moment from "moment";

import {
  COMPACT_TIMELINE,
  HIDE_TIMELINE,
  MAX_LINES_BINARY,
  MAX_LINES_JSON,
  RESET_SEARCH,
  TRIGGER_TIMELINE_DETAILS,
  UPDATE_ITEMS_PER_PAGE,
  UPDATE_PAGE,
  UPDATE_QUERY,
  UPDATE_TIME_RANGE,
} from '../actions';
import { SEARCH_SUCCESS, SEARCH_REQUEST } from '../actions-api';
import {getVisiblePages} from "../selectors/pager"
import timeline from "../timeline";

const initial = {
  query: "",
  searchInProgress: false,
  timeRange: "",
  data: {
    total: 0,
    took: 0,
    earliest: moment.utc().subtract(5, "minutes").valueOf(),
    latest: moment.utc().valueOf(),
    graph: timeline,
    rows: [],
    offsets: {},
  },
  timeline: {
    showDetails: true,
    hidden: false,
    compact: true,
  },
  results: {
      itemsPerPage: 50,
      json: {
        maxLines: "all",
      },
      binary: {
        maxLines: "all",
      },
  },
  time: {
    range: "last_5_min"
  },
  pager: {
    visiblePages: [],
    currentPage: 1,
  },
};

export default (state = initial, action) => {
  switch (action.type) {

    case RESET_SEARCH : {
      return {
        ...state,
        data: {
          ...state.data,
          offsets: {},
          //TODO: reset graph here as well
        }
      }
    }

    case UPDATE_QUERY : {
      return {
        ...state,
        query: action.value,
      };
    }

    case UPDATE_PAGE : {
      return {
        ...state,
        pager: {
          ...state.pager,
          currentPage: action.value
        }
      };
    }

    case UPDATE_TIME_RANGE : {
      return {
        ...state,
        time: {
          ...state.time,
          range: action.value,
        }
      };
    }

    case HIDE_TIMELINE : {
      return {
        ...state,
        timeline: {
          ...state.timeline,
          hidden: true,
          compact: false,
        },
      };
    }

    case COMPACT_TIMELINE : {
      return {
        ...state,
        timeline: {
          ...state.timeline,
          hidden: false,
          compact: true,
        },
      };
    }

    case TRIGGER_TIMELINE_DETAILS : {
      return {
        ...state,
        timeline: {
          ...state.timeline,
          showDetails: !state.timeline.showDetails,
        },
      };
    }

    case UPDATE_ITEMS_PER_PAGE : {
      return {
        ...state,
        results: {
          ...state.results,
          itemsPerPage: action.value,
        },
      };
    }

    case MAX_LINES_JSON : {
      return {
        ...state,
        results: {
          ...state.results,
          json: {
            ...state.results.json,
            maxLines: action.value,
          }
        },
      };
    }

    case MAX_LINES_BINARY : {
      return {
        ...state,
        results: {
          ...state.results,
          binary: {
            ...state.results.binary,
            maxLines: action.value,
          }
        },
      };
    }

    case SEARCH_REQUEST : {
      return {
        ...state,
        searchInProgress: true
      }
    }

    case SEARCH_SUCCESS : {
      return {
        ...state,
        searchInProgress: false,
        pager: {
          ...state.pager,
          visiblePages: getVisiblePages(state.pager.currentPage, action.payload.total, state.results.itemsPerPage)
        },
        data: {
          ...state.data,
          total: action.payload.total,
          earliest: action.payload.earliest,
          latest: action.payload.latest,
          took: action.payload.took,
          offsets: {
            ...state.data.offsets,
            ...action.payload.offsets
          },
          rows: _.map(action.payload.rows, (msg) => {
            if(msg.type === "json") {
              msg.value.value = Base64.decode(msg.value.value);
            }

            return msg
          }),
        }
      }
    }

    default:
      return state;
    }
}
