#!/usr/bin/env zx

import { $ } from "zx";

await $`bun husky`;
await $`git config core.ignorecase false`;
