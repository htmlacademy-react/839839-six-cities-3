const getRatingPercentage = (rating: number): number =>
  Math.round(rating) * 20;

function getRandomInt(min: number, max: number) {
  const roundedStart = Math.ceil(min);
  const roundedEnd = Math.floor(max);
  return Math.floor(Math.random() * (roundedStart - roundedEnd)) + roundedEnd;
}

export {getRatingPercentage, getRandomInt};
