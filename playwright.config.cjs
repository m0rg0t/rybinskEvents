const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({testDir:'./tests/browser',retries:0,
 use:{serviceWorkers:'block',trace:'retain-on-failure'},
 projects:[{name:'chromium',use:{browserName:'chromium'}},{name:'webkit',use:{browserName:'webkit'}}],
 webServer:[
  {command:'python3 -m http.server 4173 --directory public --bind 127.0.0.1',url:'http://127.0.0.1:4173',reuseExistingServer:false},
  {command:'python3 -m http.server 4174 --directory test-site --bind 127.0.0.1',url:'http://127.0.0.1:4174',reuseExistingServer:false}
 ]});
