console.time("runtime");
import { getInput } from "./utils/inputOutput.js";
import { Broadcaster, FlipFlop, Conjunction } from "./eModules.js";
import { lcm } from "mathjs";

solve();

function solve() {
  let path = process.argv[2];
  let input = getInput(path);

  let cfg = parse(input);
  console.table(cfg);
  let answer = [0, 0];

  answer[0] = partOne(cfg);
  cfg = parse(input);
  answer[1] = partTwo(cfg);

  console.log(answer);
  console.timeEnd("runtime");
}
//part 1 - 817896682 53ms
//part 2 -
// 1289512560 too low
// 61849660813 too low
// 494985031035 too low
function partOne(cfg) {
  let low = 0;
  let high = 0;
  let queue = [];
  for (let presses = 0; presses < 1000; presses++) {
    queue.push(["button", "broadcaster", "low"]);

    while (queue.length != 0) {
      // console.log(queue);
      let step = queue.shift();
      // console.log(step);
      if (step[2] == "low") {
        low++;
      } else {
        high++;
      }
      if (cfg.has(step[1])) {
        let result = cfg.get(step[1]).receive(step[2], step[0]);
        if (result != -1) {
          queue.push(...result);
        }
      }
    }
  }
  console.log("Low: " + low);
  console.log("High: " + high);
  return low * high;
}

function partTwo(cfg) {
  let queue = [];
  let presses = 1;
  let rz = [];
  let lf = [];
  let br = [];
  let fk = [];

  while (presses < 10000) {
    presses++;
    queue.push(["button", "broadcaster", "low"]);
    while (queue.length != 0) {
      let step = queue.shift();
      if (step[0] == "rz" && step[2] == "high") {
        rz.push(presses);
      }
      if (step[0] == "lf" && step[2] == "high") {
        lf.push(presses);
      }
      if (step[0] == "br" && step[2] == "high") {
        br.push(presses);
      }
      if (step[0] == "fk" && step[2] == "high") {
        fk.push(presses);
      }
      if (cfg.has(step[1])) {
        let result = cfg.get(step[1]).receive(step[2], step[0]);
        if (result != -1) {
          queue.push(...result);
        }
      }
    }
  }
  let answer = lcm(rz[1] - rz[0], lf[1] - lf[0], br[1] - br[0], fk[1] - fk[0]);
  console.log(rz);
  console.log(lf);
  console.log(br);
  console.log(fk);

  return answer;
}
function parse(input) {
  let moduleList = new Map();
  let conList = [];
  input.forEach((line) => {
    let [name, destinations] = [...line.split(" -> ")];
    let mod;

    switch (name.charAt(0)) {
      case "%":
        mod = new FlipFlop(name.substring(1), destinations.split(", "));
        moduleList.set(name.substring(1), mod);
        break;
      case "&":
        mod = new Conjunction(name.substring(1), destinations.split(", "));
        moduleList.set(name.substring(1), mod);
        conList.push(mod);
        break;
      default:
        mod = new Broadcaster(name, destinations.split(", "));
        moduleList.set(name, mod);
        break;
    }
  });

  conList.forEach((conMod) => {
    moduleList.forEach((mod) => {
      if (mod.destinations.includes(conMod.name)) {
        conMod.states.set(mod.name, "low");
      }
    });
  });

  return moduleList;
}
