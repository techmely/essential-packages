e2e.headless:
	yarn playwright test --headed

e2e.open:
	yarn playwright test --project=chromium --ui

build.vike:
	yarn nx run-many -t build -p @techmely/vike-react @techmely/vike-react-query

build:
	yarn nx run-many -t build -p --parallel=10

publish:
	yarn nx run-many -t publish -p --parallel=10
