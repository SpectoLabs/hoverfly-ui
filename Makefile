run:
	npm install
	npm start

test:
	npm test

build:
	npm run build
	zip -j dist.zip dist/*
