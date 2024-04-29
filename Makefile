e2e.headless:
	bun playwright test --headed

e2e.open:
	bun playwright test --project=chromium --ui

build:
	moon :build

clean:
	moon :clean

publish:
	moon :publish

upgrade.deps:
	upgrade.deps
	moon :upgrade.deps
	bun install
