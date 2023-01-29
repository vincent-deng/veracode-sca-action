// const { execSync } = require('child_process');
const { spawn } = require('child_process');
const { setFailed } = require('@actions/core');
const artifact = require('@actions/artifact');

async function run() {
  let failJob = false;
  const commands = [
    `curl -sSL https://download.sourceclear.com/ci.sh | sh -s -- scan > srcclr-out.txt`,
    `curl -sSL https://download.sourceclear.com/ci.sh | sh -s -- scan --json='srcclr-output.json'`
  ]

  let executions = commands.map(command => spawnCommand(command));

  await Promise.all(executions);

  // try {
  //   output = execSync(`curl -sSL https://download.sourceclear.com/ci.sh | sh -s -- scan --json='srcclr-output.json'`)
  // } catch(error) {
  //   failJob = true;
  // }

  const artifactClient = artifact.create()
  const artifactName = 'Veracode SCA Results';
  const files = [
    'srcclr-output.txt', 
    'srcclr-output.json'
  ];
  const rootDirectory = process.cwd()
  const options = { continueOnError: true }
  await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);

  if (failJob) setFailed(output)
}

async function spawnCommand(command) {
  spawn('sh', ['-c', command]);
}

run();