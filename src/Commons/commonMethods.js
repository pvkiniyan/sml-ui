export const check = (reducer, param) => reducer[param] ? reducer[param] : {}

export const checkPropsChange = (nextProps, prevProps) => {
  Object.keys(nextProps)
    .filter(key => {
      return nextProps[key] !== prevProps[key];
    })
    .map(key => {
      console.log(
        'changed property:',
        key,
        'from',
        prevProps[key],
        'to',
        nextProps[key]
      );
    });
}