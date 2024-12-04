export class eModule {
  constructor(name, destinations) {
    this.destinations = destinations;
    this.name = name;
  }
  send(pulse) {
    let result = [];
    this.destinations.forEach((destination) => {
      result.push([this.name, destination, pulse]);
    });
    return result;
  }
}

export class Broadcaster extends eModule {
  constructor(name, destinations) {
    super(name, destinations);
  }
  receive(pulse) {
    return this.send(pulse);
  }
}

export class FlipFlop extends eModule {
  constructor(name, destinations) {
    super(name, destinations);
    this.state = false;
  }
  receive(pulse) {
    if (pulse == "low") {
      this.state = !this.state;
      if (this.state) {
        return this.send("high");
      } else {
        return this.send("low");
      }
    }
    return -1;
  }
}

export class Conjunction extends eModule {
  constructor(name, destinations) {
    super(name, destinations);
    this.states = new Map();
  }
  receive(pulse, sender) {
    this.states.set(sender, pulse);
    // console.log(this.states);
    let allHigh = true;
    this.states.forEach((value) => {
      if (value != "high") {
        allHigh = false;
      }
    });
    if (allHigh) {
      return this.send("low");
    } else {
      return this.send("high");
    }
  }
}
