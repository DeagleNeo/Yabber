function getKeybyValueFromMap(map, inputValue) {
  const matched= [...map].find(([key, value]) => inputValue === value)
  if (!matched) return null
  return matched[0]
}

module.exports = getKeybyValueFromMap;
