function exclude(props, ...keys) {
  if (Array.isArray(props)) {
    return props.map((prop) => {
      for (let key of keys) {
        delete prop[key];
      }

      return prop;
    });
  } else {
    for (let key of keys) {
      delete props[key];
    }
  }
  return props;
}

module.exports = exclude;
