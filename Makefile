
# Build the site
build:
	@echo "Building site"
	@jekyll build --drafts

# Watch the site for changes, then build
watch:
	@echo "Watching and building site"
	@jekyll build --watch --drafts

# Serve the site
serve:
	@echo "Serving site"
	@jekyll serve --watch --drafts
