window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
  Notification.requestPermission(function(status) {
    alert('Notification permission status:', status);
  });
  function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        reg.showNotification('Hello world!');
      });
    }
  }
  displayNotification();
}
