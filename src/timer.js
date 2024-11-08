// @ts-check

class TimeMark {
  /** @type {number} */
  start;

  /** @type {number?} */
  end = null;

  /** @param {number} start - The start of the TimeMark */
  constructor(start) {
    this.start = start;
  }

  get duration() {
    return (this.end || Date.now()) - this.start;
  }
}

class Timer {
  /** @type {TimeMark[]} */
  #steps = [];

  /** @type {TimeMark?} */
  #result = null;

  static start() {
    const timer = this instanceof Timer ? this : new Timer();

    const now = Date.now();
    const globalMark = new TimeMark(now);
    const firstStep = new TimeMark(now);

    timer.#result = globalMark;
    timer.#steps.push(firstStep);

    return timer;
  }

  step() {
    const lastMark = /** @type {TimeMark} */ (this.#steps.at(-1));

    if (lastMark.end) {
      throw new Error("Can't step a stopped timer.");
    }

    const now = Date.now();

    lastMark.end = now;
    const nextStep = new TimeMark(now);

    this.#steps.push(nextStep);
  }

  stop() {
    if (!this.#result) {
      throw new Error("Can't stop a non-started timer.");
    }

    if (this.#result.end) {
      return this;
    }

    const lastMark = /** @type {TimeMark} */ (this.#steps.at(-1));

    const now = Date.now();

    lastMark.end = now;
    this.#result.end = now;

    return this;
  }

  get duration() {
    return this.#result?.duration || 0;
  }

  get steps() {
    return this.#steps.map((step) => ({
      ...step,
      duration: step.duration,
    }));
  }
}

module.exports = Timer;
