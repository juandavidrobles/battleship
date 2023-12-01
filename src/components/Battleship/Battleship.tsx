import { CellStatus } from "@/enums/CellStatus";
import { useBattleship } from "@/hooks";
import classNames from "classnames";
import React from "react";
import styles from "./Battleship.module.css";
import { BattleStatus } from "@/enums";
import { ScoreBoard } from "../ScoreBoard";
import { ShipStatus } from "../ShipStatus";

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
        <div
          className={classNames(
            "m-4 mt-0 flex flex-col gap-5",
            styles.leftPanel
          )}
        >
          <ScoreBoard player1Score={0} player2Score={0} />

          <ShipStatus
            shipName="carrier"
            destroyed={0}
            shipTypes={battleShipConfig.shipTypes}
          />
          <ShipStatus
            shipName="battleship"
            destroyed={0}
            shipTypes={battleShipConfig.shipTypes}
          />
          <ShipStatus
            shipName="cruiser"
            destroyed={0}
            shipTypes={battleShipConfig.shipTypes}
          />
          <ShipStatus
            shipName="submarine"
            destroyed={0}
            shipTypes={battleShipConfig.shipTypes}
          />
          <ShipStatus
            shipName="destroyer"
            destroyed={0}
            shipTypes={battleShipConfig.shipTypes}
          />
          <div>{gameStatus === BattleStatus.FINISHED && "Victory!"}</div>
        </div>
        <div className={styles.rightPanel}>
          <div
            className={classNames("grid grid-cols-10", styles.boardContainer)}
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
    </div>
  );
};

export default Battleship;
