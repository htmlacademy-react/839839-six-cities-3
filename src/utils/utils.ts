const getRatingPercentage = (rating: number, maxRating: number = 5): number =>
  (rating / maxRating) * 100;

export {getRatingPercentage};
