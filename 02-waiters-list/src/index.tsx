import React from 'react';
import ReactDOM from 'react-dom/client';
import {WaitersApp} from "./features/waiters";
import {WaitersApi} from "./features/waiters/api/WaitersApi";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<WaitersApp waitersApi={new WaitersApi('http://localhost:4000/waiters')}/>);

