import { images } from "../Cards";

export function shuffle() {
  let cards = [];
  for (let i = 0; i < 16; i++) {
    cards.push({
      img: images[Math.floor(i / 2)],
      id: i,
      open: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

const initialState = {
  cards: shuffle(),
  flipped: [],
  steps: 0,
};

export const reducer = (state = initialState, action) => {
  if (action.type === "TOGGLE_CARD") {
    let newCards = [...state.cards];
    newCards[action.id].open = true;
    let newFlipped = [...state.flipped];
    let newSteps = state.steps;
    if (newFlipped.length === 2) {
      newSteps++;
      if (newCards[newFlipped[0]].img !== newCards[newFlipped[1]].img) {
        newCards[newFlipped[0]].open = false;
        newCards[newFlipped[1]].open = false;
      }
      newFlipped = [];
    }
    newFlipped.push(action.id);
    return {
      ...state,
      cards: newCards,
      flipped: newFlipped,
      steps: newSteps,
    };
  } else if (action.type === "RESTART_GAME") {
    return {
      cards: shuffle(),
      flipped: [],
      steps: 0,
    };
  }
  return state;
};
