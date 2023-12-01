import React from "react";
import styles from "./ScoreBoard.module.css";
import classNames from "classnames";

const SingleScoreBoard = ({
  color,
  score,
  label,
}: {
  color: string;
  score: number;
  label: string;
}) => {
  return (
    <div className={classNames(styles.singleScoreBoard, "p-3")} style={{ backgroundColor: color }}>
      <div className="text-center pb-3 text-2xl">{score}</div>
      <div className={styles.divider}></div>
      <div className="pt-3 text-lg">{label}</div>
    </div>
  );
};

export const ScoreBoard = (
  {
    player1Score,
    player2Score,
  }:
    | {
        player1Score: number;
        player2Score: number;
      }
    | undefined = {
    player1Score: 0,
    player2Score: 0,
  }
) => {
  return (
    <div className={styles.scoreBoardContainer}>
      <SingleScoreBoard color="#ffb000" score={player1Score} label="Player 1" />
      <SingleScoreBoard color="#26b79f" score={player2Score} label="Player 2" />
    </div>
  );
};
