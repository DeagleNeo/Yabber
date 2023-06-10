function stringToColor(string) {
  if (!string) {
    return;
  }
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function getInitialLetter(name) {
  if (!name) {
    return;
  }
  const nameArray = name.trim().toUpperCase().split(" ");
  const displayName =
    nameArray[0][0] + (nameArray.length > 1 ? nameArray[1][0] : "");
  return displayName;
}

export { stringToColor, getInitialLetter };
