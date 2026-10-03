import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mountEventMap} from '../src/lib/event-map.ts';
function setup(key = 'synthetic-not-a-key') {
    const scripts = []; const state = {created:0,destroyed:0,marks:0,errors:0}; let ready;
    const document = {createElement() { return {remove() {this.removed = true;}}; }, head: {appendChild(script) {scripts.push(script);}}};
    const provider = {ready(callback) {ready = callback;}, Map: class {constructor(){state.created++;this.geoObjects={add(){state.marks++;}};}destroy(){state.destroyed++;}}, Placemark: class {}};
    const options = {document,key,container:{},getProvider:()=>provider,events:[{lat:1,lng:2,title:'Synthetic event',description:null}],onError:()=>state.errors++};
    return {options,scripts,state,ready:()=>ready()};
}
test('missing config makes no provider requests', () => {
    const h=setup('');const dispose=mountEventMap(h.options);assert.equal(h.scripts.length,0);dispose();
});
test('load, create and cleanup are idempotent and preserve the host-owned provider', () => {
    const h=setup();const dispose=mountEventMap(h.options);h.scripts[0].onload();h.ready();h.ready();
    assert.equal(h.state.created,1);assert.equal(h.state.marks,1);dispose();dispose();assert.equal(h.state.destroyed,1);assert.equal(h.scripts[0].removed,true);assert.equal(h.scripts[0].onload,null);
});
test('unmount before load or provider readiness does not create a map', () => {
    for(const loaded of [false,true]){const h=setup();const dispose=mountEventMap(h.options);const onload=h.scripts[0].onload;if(loaded)onload();dispose();if(loaded)h.ready();else onload();assert.equal(h.state.created,0);}
});
test('script error, missing API and constructor error trigger fallback and release script', () => {
    for(const mode of ['script','missing','constructor']){const h=setup();if(mode==='missing')h.options.getProvider=()=>null;if(mode==='constructor')h.options.getProvider().Map=class{constructor(){throw Error('synthetic');}};
      const dispose=mountEventMap(h.options);if(mode==='script')h.scripts[0].onerror();else{h.scripts[0].onload();if(mode==='constructor')h.ready();}
      assert.equal(h.state.errors,1);assert.equal(h.scripts[0].removed,true);dispose();}
});
test('a second mount creates a fresh map after cleanup', () => {
    const h=setup();let dispose=mountEventMap(h.options);h.scripts[0].onload();h.ready();dispose();dispose=mountEventMap(h.options);h.scripts[1].onload();h.ready();dispose();assert.equal(h.state.created,2);assert.equal(h.state.destroyed,2);
});
test('provider readiness timeout releases script and reports fallback once', t => {
    t.mock.timers.enable({apis: ['setTimeout']});
    const h = setup(); const dispose = mountEventMap(h.options);
    h.scripts[0].onload(); t.mock.timers.tick(15000);
    assert.equal(h.state.errors,1); assert.equal(h.scripts[0].removed,true);
    h.ready(); assert.equal(h.state.created,0); dispose();
});
