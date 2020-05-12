/**
 * Socket - real time data update
 */

import io from 'socket.io-client';

export const createSocket = ({ url, events }) => {
  const socket = io(url);

  socket.on('connect', () => console.log('Socket connected'));
  socket.on('disconnect', () => console.log('Socket disconnected'));
  // socket.on('unauthorized', () => console.log('Socket unauthorized'));

  socket.on('authenticate', () =>
    socket.emit('authenticate', window.localStorage.token)
  );

  for (const [event, handler] of Object.entries(events))
    socket.on(event, handler);

  return socket;
};
