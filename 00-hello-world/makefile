install:
	npm install solc;
	npm install truffle;
	npm install lodash;
	npm install chai chai-as-promised;

run-test:
	node scripts/truffle-hello-world.js

truffle-blockchain:
	truffle develop;

# you must be running your dev blockchain using "Ganache"
truffle-cli:
	truffle console --network development;

truffle-migrate:
	truffle migrate --network development;

truffle-test:
	truffle test --network development;