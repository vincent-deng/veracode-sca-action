const { execSync } = require('child_process');

async function run() {
  try {
    execSync('curl -sSL https://download.sourceclear.com/ci.sh | sh -s scan > srcclr-output.txt')
  } catch(error) {
    console.log(error);
  }

  const output = execSync('cat srcclr-output.txt').toString();
  console.log(output);
}

run();