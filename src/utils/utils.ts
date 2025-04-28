const getRatingPercentage = (rating: number): number =>
  Math.round(rating) * 20;

export {getRatingPercentage};
