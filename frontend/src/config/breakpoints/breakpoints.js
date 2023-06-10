import theme from "../../theme";

const { values } = theme.breakpoints;
const breakpoints = {};

for (const [key, value] of Object.entries(values)) {
  breakpoints[key] = value + "px";
}

export default breakpoints;
