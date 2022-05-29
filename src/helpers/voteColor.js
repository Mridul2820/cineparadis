const voteColor = (voteAvg) => {
  if (voteAvg >= 8) {
    return '#388e3c';
  } else if (voteAvg < 8 && voteAvg >= 6) {
    return '#303f9f';
  } else if (voteAvg < 6 && voteAvg >= 3.5) {
    return '#ef6c00';
  } else if (voteAvg === 0) {
    return '#666';
  } else {
    return '#d32f2f';
  }
};

export default voteColor;
