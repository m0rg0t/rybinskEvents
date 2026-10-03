import React from 'react';
import {createRoot} from 'react-dom/client';
import Events from '../../src/components/events/events';
const fixture = [{placeId:'Synthetic square',lat:0,lng:0,date:'03-10-2026',fromTime:'12:00',toTime:'14:00',title:'Synthetic event',image:null,description:'Synthetic fixture only'}];
createRoot(document.getElementById('root')!).render(<React.StrictMode><Events sourceEvents={fixture}/></React.StrictMode>);
