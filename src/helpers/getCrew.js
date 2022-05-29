export const getDirector = (crew) => {
  if (crew) {
    return crew.filter((item) => item.job === 'Director');
  }
};

export const getProducer = (crew) => {
  if (crew) {
    return crew.filter((item) => item.job === 'Producer');
  }
};
