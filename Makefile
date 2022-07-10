.PHONY: git-hooks
git-hooks:
	# Config git settings
	git config core.ignoreCase false
	git config core.eol lf
	git config core.hooksPath .githooks

	# Allow bash script execute
	chmod -R 777 .githooks
