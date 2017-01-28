import { EventEmitter } from 'events';

const log = new EventEmitter();

export default log;

log.debug = (message, object = undefined) => {
  log.emit('log-event', { text: message, type: 'debug', object });
  if (object) {
    console.log(`DEBUG: ${message} ${JSON.stringify(object)}`);
  } else {
    console.log(`DEBUG: ${message}`);
  }
};

log.info = (message) => {
  log.emit('log-event', { text: message, type: 'info' });
  console.log(`INFO: ${message}`);
};

log.success = (message) => {
  log.emit('log-event', { text: message, type: 'success' });
  console.log(`SUCCESS: ${message}`);
};

log.error = (message) => {
  log.emit('log-event', { text: message, type: 'danger' });
  console.log(`ERROR: ${message}`);
};

log.fatal = (message, object = undefined) => {
  log.emit('log-event', { text: message, type: 'fatal', object });
  if (object) {
    console.log(`FATAL: ${message} ${JSON.stringify(object)}`);
  } else {
    console.log(`FATAL: ${message}`);
  }
};
