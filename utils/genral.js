const combineParams = (obj, notation) => {
  const full = JSON.parse(JSON.stringify(obj));
  const properties = Object.keys(full);
  let command = '';
  properties.forEach((element) => {
    let value = obj[element];

    if (typeof value === 'string') {
      value = `'${value}'`;
    }

    command += `${notation}.${element}=${value}`;
    if (element !== properties[properties.length - 1]) {
      command += ' AND ';
    }
  });

  return command;
};

module.exports = {
  combineParams,
};
