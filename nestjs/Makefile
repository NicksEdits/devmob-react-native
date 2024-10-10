COMPOSE=docker compose
EXEC_API=$(COMPOSE) exec app

start: 
	$(COMPOSE) up -d --remove-orphans

stop:
	$(COMPOSE) down

restart: stop start

sh-api:
	$(EXEC_API) sh

install-deps:
	$(EXEC_API) yarn install