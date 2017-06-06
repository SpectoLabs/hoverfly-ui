run:
	npm install
	npm start

test:
	npm test

build:
	ng build --prod --aot
	zip -j dist.zip dist/*
