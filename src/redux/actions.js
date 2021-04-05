export const toggleCard = (id) => {
  return {
    type: "TOGGLE_CARD",
    id,
  };
};

export const restartGame = () => {
  return {
    type: "RESTART_GAME",
  };
};
