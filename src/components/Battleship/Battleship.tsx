import { CellStatus } from "@/enums/CellStatus";
import { useBattleship } from "@/hooks";
import classNames from "classnames";
import React from "react";
import styles from "./Battleship.module.css";
import { BattleStatus } from "@/enums";
import { ScoreBoard } from "../ScoreBoard";

type Props = {
  size?: number;
  battleShipConfig: BattleShipConfig;
};

const Battleship = ({ size = 10, battleShipConfig }: Props) => {
  const {
    gameBoard: board,
    hitCell,
    gameStatus,
  } = useBattleship({
    size,
    battleShipConfig,
  });
  console.log("board", board);
  return (
    <div className="container m-10">
      <div className="flex items-start">
        <div className="m-4 mt-0">
          <ScoreBoard player1Score={0} player2Score={0} />
        </div>
        <div>{gameStatus === BattleStatus.FINISHED && "Victory!"}</div>
        <div
          className={classNames(
            "grid grid-cols-10 w-64 h-64",
            styles.boardContainer
          )}
        >
          {board.map((row, y) => {
            return row.map((cell, x) => (
              <div
                key={`(${x},${y})`}
                className={
                  "border border-gray-400 flex justify-center items-center"
                }
              >
                <button
                  className={classNames(styles.button, {
                    [styles.hitCell]: cell === CellStatus.HIT,
                    [styles.missCell]: cell === CellStatus.MISS,
                  })}
                  onClick={() => hitCell({ x, y })}
                  disabled={
                    ([CellStatus.HIT, CellStatus.MISS] as string[]).includes(
                      cell
                    ) || gameStatus !== BattleStatus.STARTED
                  }
                />
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
};

export default Battleship;
