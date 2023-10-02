.PHONY: e2e.headless
e2e.headless:
	yarn playwright test --headed

.PHONY: e2e.open
e2e.open:
	yarn playwright test --project=chromium --ui
