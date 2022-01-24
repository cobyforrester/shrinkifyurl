.PHONY: build

build:
	sam build

deploy:
	sam deploy --config-file=samconfig.toml --profile=coby

bd:
	make build && make deploy