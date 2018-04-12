/**
 * Exports the socket.io client connection.
 * @since 4/10/18
 * @file
 */

import io from 'socket.io-client';
import { SOCKET_HOST_URL } from './constants';

export default io(SOCKET_HOST_URL);
