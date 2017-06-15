run:
	npm install
	npm start

test:
	npm test
	npm run e2e

build:
	ng build --prod --aot
	zip -j dist.zip dist/*
