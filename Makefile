e2e.headless:
	bun playwright test --headed

e2e.open:
	bun playwright test --project=chromium --ui

build:
	bun nx run-many -t build -p

clean:
	bun nx run-many -t clean -p

publish:
	bun nx run-many -t publish -p

upgrade.deps:
	bun run upgrade.deps
	bun nx run-many -t upgrade.deps -p
	bun install
