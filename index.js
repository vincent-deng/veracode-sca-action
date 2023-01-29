const { execSync } = require('child_process');

async function run() {
  const output = execSync('ls -l').toString();
  console.log(output);
}

run();