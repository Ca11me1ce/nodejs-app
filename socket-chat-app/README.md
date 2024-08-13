# socket-chat-app: Chat App using socket.io
`Node.js` `Express.js` `Socket.IO`

### Run command: 
```
node ./index.js
```
### Install Express and Socket IO 
```
npm install express socket.io
```
### Initialize App
```
npm init -y
```
### Express App
```
const express = require('express');
const app = express();

// Define routes and middleware here
// ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

```

### socket-chat-app Design
![socket-chat-app](./images/socket-chat-app.png "socket-chat-app")
