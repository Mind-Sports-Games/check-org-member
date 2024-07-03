# check-org-member
Check if actor belongs to our organisation to enable workflows

## Setup guide used

https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action

## Build

run `ncc build index.js --license licenses.txt`

## Usage

An example workflow using the action:

```yaml
name: My Workflow

on:
  push:
  pull_requests:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check if organization member
        id: check_org_member
        uses: Mind-Sports-Games/check-org-member@1.0.0
        with:
          username: ${{ github.actor }}
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: Create Comment
        if: |
          ${{ steps.check_org_member.outputs.result == 'false' }}
        run: echo User Does Not Belong to Mind-Sports-Games

```

