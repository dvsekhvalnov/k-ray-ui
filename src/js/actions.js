import { last_5_min } from './selectors/timerange';

export const UPDATE_QUERY="SEARCH:UPDATE_QUERY"
export const RESET_SEARCH="SEARCH:RESET"
export const UPDATE_PAGE="PAGER:UPDATE_PAGE"
export const UPDATE_TIME_RANGE="TIME:UPDATE_RANGE"

export const UPDATE_LOCATION="LOCATION:UPDATE"

export const HIDE_TIMELINE="TIMELINE:HIDE"
export const COMPACT_TIMELINE="TIMELINE:COMPACT"
export const TRIGGER_TIMELINE_DETAILS="TIMELINE:TRIGGER_DETAILS"

export const UPDATE_ITEMS_PER_PAGE="RESULTS:UPDATE_ITEMS_PER_PAGE"
export const MAX_LINES_JSON="RESULTS:MAX_LINES_JSON"
export const MAX_LINES_BINARY="RESULTS:MAX_LINES_BINARY"
export const TOGGLE_JSON_PRETTY_PRINT="RESULTS:TOGGLE_JSON_PRETTY_PRINT"
export const TOGGLE_ROW_PRETTY_PRINT="ROW:TOGGLE_PRETTY_PRINT"
export const TOGGLE_TOPIC_DETAILS="RESULTS:TOGGLE_TOPIC_DETAILS"
export const TOGGLE_EXTENDED_TIMESTAMP="RESULTS:TOGGLE_EXTENDED_TIMESTAMP"
export const TOGGLE_ENRICHMENT_DETAILS="RESULTS:TOGGLE_ENRICHMENT_DETAILS"
export const DISPLAY_RAW_KEY = "KEY:DISPLAY_RAW_KEY"
export const TOGGLE_KEY_PRETTY_PRINT = "KEY:TOGGLE_PRETTY_PRINT"

export const updateDisplayRawKey = (value="Auto") => ({
    type: DISPLAY_RAW_KEY,
    value: value,
});

export const toggleKeyPrettyPrint = (value) => ({
    type: TOGGLE_KEY_PRETTY_PRINT,
    value,
});

export const toggleEnrichmentDetails = () => ({
    type: TOGGLE_ENRICHMENT_DETAILS,
});

export const toggleExtendedTimestamp = () => ({
    type: TOGGLE_EXTENDED_TIMESTAMP,
});

export const toggleTopicDetails = () => ({
    type: TOGGLE_TOPIC_DETAILS,
});

export const toggleJsonPrettyPrint = () => ({
    type: TOGGLE_JSON_PRETTY_PRINT,
});

export const toggleRowPrettyPrint = (value) => ({
    type: TOGGLE_ROW_PRETTY_PRINT,
    value,
});

export const updateTimerange = (value=last_5_min) => ({
    type: UPDATE_TIME_RANGE,
    value,
});

export const resetSearch = () => ({
    type: RESET_SEARCH,
});

export const updatePage = (value=1, visiblePages= []) => ({
    type: UPDATE_PAGE,
    value,
});

export const updateMaxLinesBinary = (value) => ({
    type: MAX_LINES_BINARY,
    value: value,
});

export const updateMaxLinesJson = (value) => ({
    type: MAX_LINES_JSON,
    value: value,
});

export const updateItemsPerPage = (value=50) => ({
    type: UPDATE_ITEMS_PER_PAGE,
    value: value,
});

export const hideTimeline = () => ({
    type: HIDE_TIMELINE,
});

export const triggerTimelineDetails = () => ({
    type: TRIGGER_TIMELINE_DETAILS,
});

export const compactTimeline = () => ({
    type: COMPACT_TIMELINE,
});

export const updateLocation = (url, search) => ({
    type: UPDATE_LOCATION,
    url,
    search,
});

export const updateQuery = (value = "") => ({
    type: UPDATE_QUERY,
    value,
});
