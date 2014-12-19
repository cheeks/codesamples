// this commonjs module is the client-side cacheing layer I wrote for evb.com
// it is referenced when rendering any view


"use strict";

var tempData = {
  'home': null,
  'work': null,
  'careers': null,
  'contact': null
};

var DataStore = {
  get: function (pageID) {
    if (typeof(window.localStorage) != 'undefined'){
      return getLocalstorage(pageID);
    } else {
      return getTempcache(pageID);
    }
  },
  set: function (pageID, data) {
    if (typeof(window.localStorage) != 'undefined'){
      setLocalstorage(pageID, data);
    } else {
      setTempcache(pageID, data);
    }
  }
};

function getLocalstorage (pageID) {
  var localStorageData = JSON.parse(window.localStorage.getItem(pageID));
  var now = new Date().getTime().toString();
  var expired = (localStorageData !== null) ? now > localStorageData.expirationdate : 'null';

  if (localStorageData && !expired) {
    return localStorageData;
  } else {
    return null;
  }
}

function getTempcache (pageID) {
  return tempData[pageID];
}

function setLocalstorage (pageID, data) {
  // Set the expiration date
  data.expirationdate = new Date().getTime() + 86400000;

  // Save localstorage data
  var localStorageData = JSON.stringify(data);

  window.localStorage.setItem(pageID, localStorageData);
}

function setTempcache (pageID, data) {
  tempData[pageID] = data;
}

module.exports = DataStore;