const ordinalToMonth = {
  '01': `January`,
  '02': `February`,
  '03': `March`,
  '04': `April`,
  '05': `May`,
  '06': `June`,
  '07': `July`,
  '08': `August`,
  '09': `September`,
  '10': `October`,
  '11': `November`,
  '12': `December`,
};

export const formatDateToDatetime = (date) => date.slice(0, 10);

export const formatDateToReviewTime = (date) => {
  const day = date.slice(8, 10);
  const month = ordinalToMonth[date.slice(5, 7)];
  const year = date.slice(0, 4);

  return `${month} ${day}, ${year}`;
};
