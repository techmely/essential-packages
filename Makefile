.PHONY: git-hooks
git-hooks:
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
	yarn plugin import interactive-tools
	yarn plugin import workspace-tools
