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
          console.log('Subscription object: ', JSON.stringify(sub));
          addSubscription();
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
        addSubscription();
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

const addSubscription = () => {
  var data = "subscription=%7B%22endpoint%22%3A%22https%3A%2F%2Ffcm.googleapis.com%2Ffcm%2Fsend%2Fd2IfkmjUW38%3AAPA91bGdJuzk6cQBE0YRILMifCEcLyvApLfGtgYNBC0pGHmC7k0GOWMSRO24TRrgkUtHbJN1_CXaFs2fw9DTdrXmDQX2hV3PlJIZ53ISQgfVcB1q2UzXONDiZ59gSKW4Ucy1Dbz927Rz%22%2C%22expirationTime%22%3Anull%2C%22keys%22%3A%7B%22p256dh%22%3A%22BAN40sfVxDonCW_faEfx46SO-fHCysUI5ogj_-gLzZkjOKccrR6TEmz5UkwZ5T3K-8i2F1gPNulbF0uSEK4TlDY%22%2C%22auth%22%3A%228h_5ejS0mB1DMjrUgN4BlQ%22%7D%7D";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://5h4wsq.deta.dev/addsubscription");
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "039c67af-f7d2-c4f9-176c-2de26470a894");

  xhr.send(data);
}
