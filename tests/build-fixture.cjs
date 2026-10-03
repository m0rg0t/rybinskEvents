const {buildSync} = require('esbuild');
const {mkdirSync,copyFileSync} = require('node:fs');
mkdirSync('test-site', {recursive:true});
copyFileSync('tests/fixture/index.html','test-site/index.html');
buildSync({entryPoints:['tests/fixture/app.tsx'],bundle:true,outfile:'test-site/fixture.js',define:{'process.env.GATSBY_YANDEX_MAPS_API_KEY':'undefined','process.env.NODE_ENV':'"production"'}});
