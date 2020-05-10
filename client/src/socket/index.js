/**
 * Socket - real time data update
 */

import io from 'socket.io-client';

export const createSocket = ({ url, onConnect, onDisconnect, onData }) => {
  const socket = io(url);

  socket.on('connect', () => onConnect && onConnect());
  socket.on('disconnect', () => onDisconnect && onDisconnect());
  socket.on('data', data => onData && onData(data));

  return socket;
};
