export enum Players {
  BLACK = "black",
  WHITE = "white",
}

export enum Pieces {
  KING = "K",
  QUEEN = "Q",
  ROOK = "R",
  PAWN = "",
  KNIGHT = "N",
  BISHOP = "B",
}

export enum CellType {
  LIGHT = "light",
  DARK = "dark",
}

export const Dimensions = {
  Rows: 8,
  Span: 60,
};

export enum BoardColors {
  LIGHT = "#F0D9B5",
  DARK = "#B58863",
  LIGHT_HIGHLIGHT = "#AAA23A",
  DARK_HIGHLIGHT = "#CDD26A",
  CHOOSE = "#829769",
}

export enum HighlightType {
  LastPlayed = "lastplayed",
  Selected = "selected",
}

export const Ranks = [
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
];
export const Files = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
];
export const Captures = new Map([
  [true, "x"],
  [false, ""],
]);
