function formatNumberK(number) {
  if (number < 1000) {
    return number;
  } else {
    return `${Math.round(number / 1000)}k`;
  }
}

export default formatNumberK;
