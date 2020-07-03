export const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

export const getRatingPercent = (rating) => {
  return Math.round(rating) * 20;
};
