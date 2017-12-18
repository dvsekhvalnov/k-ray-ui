import qs from "qs";
import _ from "lodash";

const omitEmpty = (prefix, value) => {  
  return value ? value : undefined;
}

const updateQuery = function(pathname, search, name, value, opts) {

  let params = qs.parse(search, { ignoreQueryPrefix: true });

  if(opts && opts.append && params[name]) {
    if(!params[name].includes(value)) {
      params[name] = params[name] + " " + value;
    }
  }
  else {
    params[name] = value;
  }

  return pathname + qs.stringify(params,{addQueryPrefix: true, filter: omitEmpty});
};

const push = function(history, params, opts) {
  const { pathname, search } = history.location;

  const newUrl = _.reduce(params, (result, value, key) => {
    return updateQuery(pathname, result, key, value, opts)
  }, search);

  //push only if url was updated to heep history lean
  if(newUrl !== pathname + search) {
    history.push(newUrl);
  }
}

export { updateQuery };
export { push };
