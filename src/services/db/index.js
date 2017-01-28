/* global sessionStorage */

import Store from 'store';

let useLocalStorage = true;

function set(id, object) {
  if (useLocalStorage) {
    Store.set(id, object);
  } else {
    sessionStorage.setItem(id, JSON.stringify(object));
  }
}

function get(id) {
  if (useLocalStorage) {
    return Store.get(id);
  }
  return JSON.parse(sessionStorage.getItem(id));
}

function remove(id) {
  if (useLocalStorage) {
    Store.remove(id);
  } else {
    sessionStorage.removeItem(id);
  }
}

function setUseLocalStorage(value) {
  useLocalStorage = value;
}

export default {
  setUseLocalStorage,
  get,
  set,
  remove
};
