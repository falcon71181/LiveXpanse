import {
  giyo_0,
  zenitsu_0,
} from "./demon-slayer/avators";
import {
  goku_0,
} from "./dragon-ball/avators";
import {
  minato_0,
  naruto_0,
} from "./naruto/avators";
import {
  ace_0,
  luffy_0,
  luffy_1,
  nami_0,
  zoro_0,
  zoro_1,
} from "./one-piece/avators";

type AvatorRecords = Record<string, string[]>;

const avators: AvatorRecords = {
  "demon-slayer": [
    giyo_0,
    zenitsu_0,
  ],
  "dragon-ball": [
    goku_0,
  ],
  "naruto": [
    minato_0,
    naruto_0,
  ],
  "one-piece": [
    ace_0,
    luffy_0,
    luffy_1,
    nami_0,
    zoro_0,
    zoro_1,
  ]
}

export default avators;
