
install-ui:
	cd ui && npm i

install-data-server:
	cd dataService && npm i

install-generator-server:
	cd generator && npm i


install:
	make -j 3 install-ui install-data-server install-generator-server

data-server:
	cd dataService && npm start

generator-server:
	cd generator && npm start

start-server:
	make -j 2 data-server generator-server

start-ui:
	cd ui && npm start