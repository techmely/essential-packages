# Release process

## Overview

While our release schedule is flexible, our general approach is to release several improvements at the same time rather than to publish small updates frequently and in isolation.

## Release strategy

We track versions during the pull request process. As features are added, modified or improved it's important to keep track of these via versioning.

### Tracking version changes

The easiest way to track changes before raising your PR is to run `yarn version check --interactive`, this will prompt you to update the semver based on files that have been modified and will store an update file in `.yarn/versions/`, this is later consumed when publishing new versions. Be sure to check-in these files along with your code changes.

### Publishing releases

1. Checkout latest `main`
2. Run `yarn npm login` and supply your credentials (ensure you have access to the org scope for publishing)
3. Run `yarn publish`
4. Commit the resulting changes directly to `main` (you'll need to temporarily disable branch protection)
