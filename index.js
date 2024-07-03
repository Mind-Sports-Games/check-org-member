import { Octokit } from "octokit";

const core = require("@actions/core");
const github = require("@actions/github");

const organization = 'Mind-Sports-Games'
const username = core.getInput("username", { required: true });
const token = core.getInput("token", { required: true });

const octokit = new Octokit({
  auth: token
});

main();

async function main() {
  const result = await octokit.request('GET /orgs/{org}/members/{username}', {
      org: organization,
      username: username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json'
      }
    });
  
  if (result.status == 204) {
    core.setOutput("result", "true");
  } else if (result.status == 302 || result.status == 404) {
    core.setOutput("result", "false");
  } else {
    core.setFailed(`Received status ${result.status} from API.`);
    process.exit();
  }
}
