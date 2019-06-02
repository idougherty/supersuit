export class Room {
  constructor(layout) {
    var obstacles = [];

    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[0].length; x++) {
        switch (layout[y][x]) {
          case "c": //crate
            obstacles.push(new Crate(x * 64, y * 64));
            break;

          case "b": //bookshelf
            obstacles.push(new Bookshelf(x * 64, y * 64));
            break;

          case "f": //fire_barrel
            obstacles.push(new FireBarrel(x * 64, y * 64));
            break;

          case "w": //wall
            obstacles.push(new Crate(x * 64, y * 64));
            break;

          default:
            console.log("we don't know what this is");
        }
      }
    }
  }
}
