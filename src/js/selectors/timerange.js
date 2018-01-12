import moment from "moment";

export const last_5_min = "last_5_min";
export const last_15_min = "last_15_min";
export const today = "today";
export const week_to_date = "week_to_date";
export const month_to_date = "month_to_date";
export const all = "all";

export const earliest = (timerange) => {
  switch (timerange) {

    case last_5_min : {
      return moment.utc().subtract(5, "minutes").valueOf();
    }

    case last_15_min : {
      return moment.utc().subtract(15, "minutes").valueOf();
    }

    case today : {
      return moment.utc().startOf("day").valueOf();
    }

    case week_to_date : {
      return moment.utc().startOf("week").valueOf();
    }

    case month_to_date : {
      return moment.utc().startOf("month").valueOf();
    }

    case all : {
      return 1;
    }

    default: return moment.utc().subtract(5, "minutes").valueOf();
  }
}


export const latest = (timerange) => moment.utc().valueOf();
