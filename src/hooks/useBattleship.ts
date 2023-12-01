import { BattleStatus } from "@/enums";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { CellStatus } from "@/enums/CellStatus";

type Props = {
  size: number;
  battleShipConfig: BattleShipConfig;
};

type BoardCellType = string | CellStatus;

const generateEmptyMatrix = (n: number): BoardCellType[][] =>
  Array.from({ length: n }, () => Array(n).fill(CellStatus.EMPTY));

const generateShipsMatrix = ({
  size,
  layout,
}: {
  size: number;
  layout: Layout[];
}) => {
  const board: BoardCellType[][] = generateEmptyMatrix(size);
  for (const shipLayout of layout) {
    shipLayout.positions.forEach((position) => {
      const [x, y] = position;
      board[x][y] = shipLayout.ship;
    });
  }
  return board;
};

const isGameOver = (gameBoard: BoardCellType[][]) =>
  gameBoard
    .flat()
    .every((cell) =>
      (
        [CellStatus.HIT, CellStatus.MISS, CellStatus.EMPTY] as string[]
      ).includes(cell)
    );

export const useBattleship = ({ size, battleShipConfig }: Props) => {
  const [gameBoard, setGameBoard] = useState<BoardCellType[][]>(
    generateShipsMatrix({ size, layout: battleShipConfig.layout })
  );
  const [gameStatus, setGameStatus] = useState(BattleStatus.STARTED);

  const hitCell = ({ x, y }: { x: number; y: number }) => {
    if (gameStatus != BattleStatus.STARTED) {
      return;
    }
    const clonedGameBoard = cloneDeep(gameBoard);
    const cellValue = clonedGameBoard[y][x];
    if (([CellStatus.HIT, CellStatus.MISS] as string[]).includes(cellValue)) {
      return;
    }
    clonedGameBoard[y][x] =
      cellValue === CellStatus.EMPTY ? CellStatus.MISS : CellStatus.HIT;
    setGameBoard(clonedGameBoard);
  };

  useEffect(() => {
    if (isGameOver(gameBoard)) {
      setGameStatus(BattleStatus.FINISHED);
    }
  }, [gameBoard]);

  return {
    gameBoard,
    gameStatus,
    hitCell,
  };
};
