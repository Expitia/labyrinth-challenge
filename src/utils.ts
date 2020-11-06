import { Cell, Coord, Directions } from "./models";

export const fillTable = (width: number, height: number) => {
  const table: Cell[][] = [];
  for (let row = 0; row < height; row++) {
    table[row] = [];
    for (let column = 0; column < width; column++) table[row][column] = {};
  }
  return table;
};

export const generateRandomDirections = () => {
  const randoms: number[] = [];
  for (let i = 0; i < 4; i++) randoms.push(i);
  randoms.sort(() => Math.random() - 0.5);
  return randoms;
};

export const createMaze = (
  row: number,
  column: number,
  width: number,
  height: number,
  table: Cell[][],
  paths: Record<number, Coord[]>,
  path = { value: 0 }
) => {
  const startPath = path.value;
  const randDirs = generateRandomDirections();
  if (!paths[startPath]) paths[startPath] = [];
  randDirs.forEach((direction) => {
    let prevRow = row,
      newRow = row,
      newColumn = column,
      prevColumn = column;
    if (startPath !== path.value) paths[path.value] = [...paths[startPath]];
    switch (direction) {
      case Directions.UP:
        newRow = newRow - 2;
        prevRow = prevRow - 1;
        break;
      case Directions.DOWN:
        newRow = newRow + 2;
        prevRow = prevRow + 1;
        break;
      case Directions.LEFT:
        newColumn = newColumn - 2;
        prevColumn = prevColumn - 1;
        break;
      case Directions.RIGHT:
        newColumn = newColumn + 2;
        prevColumn = prevColumn + 1;
        break;
    }
    if (
      newRow > 0 &&
      newColumn > 0 &&
      newRow < height - 1 &&
      newColumn < width - 1 &&
      !table[newRow][newColumn].isPath
    ) {
      table[newRow][newColumn].isPath = true;
      table[prevRow][prevColumn].isPath = true;
      table[newRow][newColumn].path = path.value;
      table[prevRow][prevColumn].path = path.value;
      paths[path.value].push({ column: prevColumn, row: prevRow });
      paths[path.value].push({ column: newColumn, row: newRow });
      createMaze(newRow, newColumn, width, height, table, paths, path);
    } else path.value++;
  });
};

export const selectRoute = (
  table: Cell[][],
  paths: Record<number, Coord[]>
) => {
  let route: Coord[] = [];
  const pathLengths = Object.keys(paths).length;
  while (!route.length) route = paths[Math.round(Math.random() * pathLengths)];
  return {
    steps: route.length,
    lastCoord: route.pop(),
  };
};

export const openFile = (callback: (text: string) => void) => {
  const fakeInput = document.createElement("input");
  fakeInput.setAttribute("type", "file");
  fakeInput.style.display = "none";
  document.body.appendChild(fakeInput);
  fakeInput.onchange = (event) => {
    event.preventDefault();
    const target = event.target as any;
    const reader = new FileReader();
    reader.onload = async (load) => {
      callback(load.target.result as string);
      document.body.removeChild(fakeInput);
    };
    reader.readAsText(target.files[0]);
  };
  fakeInput.click();
};
