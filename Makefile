build:
	sam build --use-container

deploy:
	sam deploy --config-file=samconfig.toml --profile=coby

bd:
	make build && make deploy

local:
	make build && sam local start-api --port 5000