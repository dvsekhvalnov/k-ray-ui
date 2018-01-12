import qs from "qs";
import _ from "lodash";

const omitEmpty = (prefix, value) => {
  return value ? value : undefined;
}

const updateQuery = function(search, name, value, opts) {

  let params = qs.parse(search, { ignoreQueryPrefix: true });

  if(opts && opts.append && params[name] && value) {
    if(!params[name].includes(value)) {
      params[name] = params[name] + " " + value; //append value to existing param
    }
  }
  else {
    params[name] = value;
  }

  return qs.stringify(params,{addQueryPrefix: true, filter: omitEmpty});
};

const push = function(history, params, opts) {
  const { pathname, search } = history.location;

  const newUrl = pathname + _.reduce(params, (result, value, key) => {
    console.log("url = ", result);
    return updateQuery(result, key, value, opts)
  }, search);

  console.log("url = ", newUrl);

  //push only if url was updated to heep history lean
  if(newUrl !== pathname + search) {
    history.push(newUrl);
    return true
  }

  return false
}

export { updateQuery };
export { push };
