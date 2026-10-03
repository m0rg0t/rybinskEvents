import {test} from 'node:test';
import assert from 'node:assert/strict';
import {eventWindow, filterEvents} from '../src/lib/event-time.ts';
const event = {date: '03-10-2026', fromTime: '12:00', toTime: '14:00'};
const at = time => new Date(`2026-10-03T${time}:00`);
test('current boundaries include start and end; future excludes start', () => {
    for (const [time, current, future] of [['11:59',0,1],['12:00',1,0],['13:00',1,0],['14:00',1,0],['14:01',0,0]]) {
        assert.equal(filterEvents([event], 'current', at(time)).length, current);
        assert.equal(filterEvents([event], 'future', at(time)).length, future);
    }
});
test('date edits recompute, invalid dates return no timed results, all preserves source', () => {
    const events = [event];
    assert.equal(filterEvents(events,'current',at('13:00')).length, 1);
    assert.equal(filterEvents(events,'current',new Date('2026-10-04T13:00')).length, 0);
    assert.equal(filterEvents(events,'current',new Date('')).length, 0);
    assert.equal(filterEvents(events,'all',new Date('')), events);
});
test('midnight and overnight ranges use 00:00 correctly without modifying stored event dates', () => {
    const night = {...event, fromTime: '23:00', toTime: '01:00'};
    const [start,end] = eventWindow(night);
    assert.equal(start.getDate(), 3); assert.equal(end.getDate(),4);
    assert.equal(filterEvents([night],'current',new Date('2026-10-04T00:00')).length,1);
    assert.equal(filterEvents([{...event,fromTime:'00:00',toTime:'00:00'}],'current',at('00:00')).length,1);
});
test('invalid calendar/time input cannot roll over silently', () => {
    for (const update of [{date:'31-02-2026'},{date:'03/10/2026'},{fromTime:'24:00'},{fromTime:'12:60'},{toTime:'bad'}]) assert.equal(eventWindow({...event,...update}),null);
});
