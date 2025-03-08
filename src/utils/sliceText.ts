function sliceText(text) {
  if (text.length <= 6) return text; 

  const firstThree = text.slice(0, 3);
  const lastThree = text.slice(-3);

  return `${firstThree}...${lastThree}`;
}

export default sliceText;