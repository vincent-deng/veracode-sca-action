const { execSync } = require('child_process');
const { setFailed } = require('@actions/core');

async function run() {
  let failJob = false;
  try {
    execSync('curl -sSL https://download.sourceclear.com/ci.sh | sh -s scan > srcclr-output.txt')
  } catch(error) {
    failJob = true;
  }

  const output = execSync('cat srcclr-output.txt').toString();
  console.log(output);

  if (failJob) core.setFailed(output)
}

run();