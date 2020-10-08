import { Base64 } from 'js-base64';
import _ from "lodash";
import moment from "moment";

import {
  COMPACT_TIMELINE,
  DISPLAY_RAW_KEY,
  HIDE_TIMELINE,
  MAX_LINES_BINARY,
  MAX_LINES_JSON,
  RESET_SEARCH,
  TOGGLE_ENRICHMENT_DETAILS,
  TOGGLE_EXTENDED_TIMESTAMP,
  TOGGLE_JSON_PRETTY_PRINT,
  TOGGLE_KEY_PRETTY_PRINT,
  TOGGLE_ROW_PRETTY_PRINT,
  TOGGLE_TOPIC_DETAILS,
  TRIGGER_TIMELINE_DETAILS,
  UPDATE_ITEMS_PER_PAGE,
  UPDATE_PAGE,
  UPDATE_QUERY,
  UPDATE_TIME_RANGE
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
      general: {
        topicDetails: true,
        extendedTimestampDetails: true,
        enrichmentDetails: true,
      },
      json: {
        maxLines: "all",
        prettyPrint: false,
      },
      binary: {
        maxLines: "all",
        prettyPrint: false,
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

    case DISPLAY_RAW_KEY : {
      const row = state.data.rows[action.value]
      const newRow = {
        ...row,
        ui: {
          ...row.ui,
          key: {
            ...row.ui.key,
            displayRawAs: action.value,
          }
        },
      }

      return {
        ...state,
        data: {
          ...state.data,
          rows:[
            ...state.data.rows.slice(0, action.value),
            newRow,
            ...state.data.rows.slice(action.value + 1)
          ],
        },
      };
    }

    case TOGGLE_KEY_PRETTY_PRINT : {
      const row = state.data.rows[action.value]
      const newRow = {
        ...row,
        ui: {
          ...row.ui,
          key: {
            ...row.ui.key,
            prettyPrint: !row.ui.key.prettyPrint,
          }
        },
      }

      return {
        ...state,
        data: {
          ...state.data,
          rows:[
            ...state.data.rows.slice(0, action.value),
            newRow,
            ...state.data.rows.slice(action.value + 1)
          ],
        },
      };
    }

    case TOGGLE_JSON_PRETTY_PRINT : {
      return {
        ...state,
        results: {
          ...state.results,
          json: {
            ...state.results.json,
            prettyPrint: !state.results.json.prettyPrint,
          }
        },
        data: {
          ...state.data,
          rows: _.map(state.data.rows, row => {
            if(row.msg.value.type !== "json") {
              return row;
            }

            return {
              ...row,
              ui: {
                ...row.ui,
                value: {
                  ...row.ui.value,
                  prettyPrint: !state.results.json.prettyPrint,
                }
              }
            }
          }),
        },
      };
    }

    case TOGGLE_ROW_PRETTY_PRINT : {

      const row = state.data.rows[action.value]
      const newRow = {
        ...row,
        ui: {
          ...row.ui,
          value: {
            ...row.ui.value,
            prettyPrint: !row.ui.value.prettyPrint,
          }
        },
      }

      return {
        ...state,
        data: {
          ...state.data,
          rows:[
            ...state.data.rows.slice(0, action.value),
            newRow,
            ...state.data.rows.slice(action.value + 1)
          ],
        },
      };
    }

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

    case TOGGLE_TOPIC_DETAILS : {
      return {
        ...state,
        results: {
          ...state.results,
          general: {
            ...state.results.general,
            topicDetails: !state.results.general.topicDetails,
          }
        },
      };
    }

    case TOGGLE_EXTENDED_TIMESTAMP : {
      return {
        ...state,
        results: {
          ...state.results,
          general: {
            ...state.results.general,
            extendedTimestampDetails: !state.results.general.extendedTimestampDetails,
          }
        },
      };
    }

    case TOGGLE_ENRICHMENT_DETAILS : {
      return {
        ...state,
        results: {
          ...state.results,
          general: {
            ...state.results.general,
            enrichmentDetails: !state.results.general.enrichmentDetails,
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
          rows: _.map(action.payload.rows, (msg, index) => {

            if(msg.value.type === "json") {
              msg.value.value = Base64.decode(msg.value.value);
              msg.value.structured = JSON.parse(msg.value.value);
            }

            if(msg.key.type === "json") {
              msg.key.value = Base64.decode(msg.key.value);
              msg.key.structured = JSON.parse(msg.key.value);
            }

            return {
              index,
              ui: {
                value: {
                  prettyPrint: state.results[msg.value.type].prettyPrint,
                },
                key: {
                  prettyPrint: state.results[msg.key.type].prettyPrint,
                  displayRawAs: "Auto"
                }
              },
              msg
            }
          }),
        }
      }
    }

    default:
      return state;
    }
}
