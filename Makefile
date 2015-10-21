# Makefile for building the project

app_name=sketch
project_dir=$(CURDIR)/../$(app_name)
build_dir=$(CURDIR)/build/artifacts
appstore_dir=$(build_dir)/appstore
source_dir=$(build_dir)/source
package_name=$(app_name)

all: dist

clean:
	rm -rf $(build_dir)

dist: clean
	mkdir -p $(source_dir)
	tar cvzf $(source_dir)/$(package_name).tar.gz $(project_dir) \
	--exclude-vcs \
	--exclude=$(project_dir)/build/artifacts \
	--exclude=$(project_dir)/js/node_modules \
	--exclude=$(project_dir)/js/coverage

appstore_package: clean
	mkdir -p $(appstore_dir)
	tar cvzf $(appstore_dir)/$(package_name).tar.gz $(project_dir) \
	--exclude-vcs \
	--exclude=$(project_dir)/build \
	--exclude=$(project_dir)/bower.json \
	--exclude=$(project_dir)/.bowerrc \
	--exclude=$(project_dir)/js/README.md \
	--exclude=$(project_dir)/phpunit.integration.xml \
	--exclude=$(project_dir)/phpunit.xml \
	--exclude=$(project_dir)/.scrutinizer.yml \
	--exclude=$(project_dir)/.travis.yml \
	--exclude=$(project_dir)/phpunit*xml \
	--exclude=$(project_dir)/Makefile \
	--exclude=$(project_dir)/tests