#!/usr/bin/env zx

import { $ } from "zx";

await $`yarn husky`;
await $`git config core.ignorecase false`;
