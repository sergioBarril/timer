const Timer = require("./src/timer");

const n = 3;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  const timer = Timer.start();

  for (let i = 0; i < n; i++) {
    const wait = Math.random() * (i + 1);
    console.log("Sleeping for" + wait);
    await sleep(wait * 1000);

    timer.step();
  }

  timer.stop();

  return timer;
}

main();
