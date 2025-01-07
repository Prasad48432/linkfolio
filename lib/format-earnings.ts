export const formatEarnings = (earnings  : number) => {
    if (earnings >= 10000000) {
      return (earnings / 10000000).toFixed(1) + "Cr";
    } else if (earnings >= 100000) {
      return (earnings / 1000).toFixed(1) + "k";
    } else if (earnings >= 1000) {
      return (earnings / 1000).toFixed(1) + "k";
    } else {
      return earnings;
    }
  };