const { execSync } = require('child_process');
const { setFailed } = require('@actions/core');
const artifact = require('@actions/artifact');

async function run() {
  let failJob = false;
  try {
    execSync(`curl -sSL https://download.sourceclear.com/ci.sh | sh -s scan --json='srcclr-output.json' > srcclr-output.txt`)
  } catch(error) {
    failJob = true;
  }

  const artifactClient = artifact.create()
  const artifactName = 'Veracode SCA Results';
  const files = ['srcclr-output.txt', 'srcclr-output.json'];
  const rootDirectory = process.cwd()
  const options = { continueOnError: true }
  await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);


  const output = execSync('cat srcclr-output.txt').toString();
  if (failJob) setFailed(output)
}

run();