window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      console.log('Service Worker Registered!', reg);
  
      reg.pushManager.getSubscription().then(function(sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log('Not subscribed to push service!');
        } else {
          // We have a subscription, update the database
          console.log('Subscription object: ', sub);
        }
      });
    })
     .catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
  }
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });
 
  
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BITeUzZcUPoOJ2RXPRPvekF7j0gpb3Ausx7qBTkobn1CktxKQfU2kr_zoor518ubFhzkxMfTzdYcwjHDp_VgkB8"
      }).then(function(sub) {
        console.log(JSON.stringify(sub));
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });

    })
  }
}
subscribeUser();

