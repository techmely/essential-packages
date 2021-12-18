.PHONY: git-hook
git-hook:
	# Config git settings
	git config core.ignoreCase false
	git config core.eol lf
	git config core.hooksPath .githooks

	# Allow bash script execute
	chmod -R 777 .githooks

.PHONY: yarn-latest
yarn-latest:
	# Config git settings
	yarn set version berry

	# Plugin

	yarn plugin import typescript
	yarn plugin import version
	yarn plugin import exec
	yarn plugin import interactive-tools
	yarn plugin import workspace-tools
	yarn plugin import constraints
