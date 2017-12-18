import { RSAA } from "redux-api-middleware";

export const SEARCH_REQUEST="SEARCH_REQUEST"
export const SEARCH_SUCCESS="SEARCH_SUCCESS"
export const SEARCH_FAILED="SEARCH_FAILED"

export const searchEvents = (search) => {
  return {
  [RSAA]: {
    endpoint: "http://localhost:8080/events",
    method: "POST",
    body: JSON.stringify(search),
    headers: {
      "Content-Type": "application/json",
    },
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILED],
  },
}
};
