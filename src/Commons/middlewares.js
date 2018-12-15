export const apiMiddleware = ( {dispatch} ) => {
 return next => action => {

  const {
    types,
    callAPI,
    payload = {}
  } = action;

  if(!types) return next(action);

  const [requestType, successType, failureType] = types;

  dispatch({...payload, type: requestType});

  return callAPI().then(
    res => dispatch({...payload, data: res.data, type: successType}),
    err => dispatch({...payload, data: err, type: failureType})  
  )
 }
}

export default apiMiddleware