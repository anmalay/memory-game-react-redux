import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultImg } from "./Cards";

export const Board = () => {
  const cards = useSelector((state) => state.cards);
  const steps = useSelector((state) => state.steps);
  const flipped = useSelector((state) => state.flipped);

  const result = cards.every((item) => item.open);

  const dispatch = useDispatch();

  const handleClick = (id, isOpen) => {
    if (!isOpen && flipped.length < 2) {
      dispatch({
        type: "TOGGLE_CARD",
        id: id,
      });
    }
  };

  const handleRestart = () => {
    dispatch({
      type: "RESTART_GAME",
    });
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => {
        dispatch({
          type: "UPDATE",
        });
      }, 500);
    }
  }, [flipped]);

  return (
    <div className="board">
      <h2>Steps: {steps + 1}</h2>
      {result && <h2>YOU WIN</h2>}
      <ul className="board-list">
        {cards.map((item, index) => (
          <li key={item.id}>
            <img
              src={item.open ? item.img : defaultImg}
              className="card"
              alt=""
              onClick={() => handleClick(index, item.open)}
            />
          </li>
        ))}
      </ul>
      <button className="button" type="button" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};
