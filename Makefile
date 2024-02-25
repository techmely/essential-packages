e2e.headless:
	bun run playwright test --headed

e2e.open:
	bun run playwright test --project=chromium --ui

build.vike:
	bun run nx run-many -t build -p @techmely/vike-react @techmely/vike-react-query

build:
	bun run nx run-many -t build -p

clean:
	bun run nx run-many -t clean -p

publish:
	bun run nx run-many -t publish -p

upgrade.deps:
	bun run upgrade.deps
	bun run nx run-many -t upgrade.deps -p
	bun install
