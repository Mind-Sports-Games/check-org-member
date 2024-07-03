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
  try {
    await octokit.request('GET /orgs/{org}/members/{username}', {
      org: organization,
      username: username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json'
      }
    });

    console.log("User belongs to org");
    core.setOutput("result", "true");

  } catch (error) {
    if (error.status === 302) {
      console.log("User does not belong to org");
      core.setOutput("result", "false");  
    } else if (error.status === 404){
      console.log("Not found");
      core.setOutput("result", "false");
    } else {
      core.setFailed(`Received status ${error.status} from API.`);
      process.exit();
    }
  };
}
