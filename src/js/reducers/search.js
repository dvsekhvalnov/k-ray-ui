import _ from "lodash"
import { Base64 } from 'js-base64';

import {
  COMPACT_TIMELINE,
  HIDE_TIMELINE,
  MAX_LINES_BINARY,
  MAX_LINES_JSON,
  TRIGGER_TIMELINE_DETAILS,
  UPDATE_ITEMS_PER_PAGE,
  UPDATE_QUERY,
  UPDATE_PAGE,
} from "../actions";

import {
  SEARCH_SUCCESS,
  SEARCH_REQUEST,
  SEARCH_FAILED
 } from '../actions-api';
import events from "../events";
import timeline from "../timeline";

const initial = {
  query: "",
  searchInProgress: false,
  timeRange: "",
  data: {
    total: 12345,
    took: 0,
    earliest: 1489516832234,
    latest: 1490994758987,
    graph: timeline,
    rows: events,
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
  pager: {
    visiblePages: [1,2,3,4,5,6,7,8,9],
    currentPage: 5,
  },
};

export default (state = initial, action) => {
  switch (action.type) {

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
          currentPage: action.value,
          visiblePages: action.visiblePages
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
