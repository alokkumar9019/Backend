


const EventEmitter = require('events');


const eventBus = new EventEmitter();




eventBus.on('userLoggedIn', (username) => {
  console.log(`> User ${username} logged in`);
});

eventBus.on('userLoggedIn', (username) => {
  console.log(`> Notification sent to ${username}`);
});


eventBus.on('messageReceived', (from, message) => {
  console.log(`> Message received from ${from}: ${message}`);
});

eventBus.on('dataSyncStart', (username) => {
  console.log(`> Syncing data for ${username}...`);
});

eventBus.on('dataSynced', (username) => {
  console.log(`> Data sync complete for ${username}`);
});




setTimeout(() => {
  eventBus.emit('userLoggedIn', 'John');


  setTimeout(() => {
    eventBus.emit('messageReceived', 'Alice', 'Hello John!');


    setTimeout(() => {
      eventBus.emit('dataSyncStart', 'John');

      setTimeout(() => {
        eventBus.emit('dataSynced', 'John');
      }, 2000);

    }, 2000);

  }, 2000);

}, 1000);
