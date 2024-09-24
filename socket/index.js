const io = require('socket.io')(9000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = [];

// Add user to the users array
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    console.log(`User added: ${userId}, with socket ID: ${socketId}`);
  } else {
    console.log(`User ${userId} already exists.`);
  }
};

// Remove user from the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(`User removed: Socket ID: ${socketId}`);
};

// Get user by userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Listen for when a user joins
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users); // Broadcast all connected users
  });

  // Send and get messages
  socket.on("SendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log(`User with ID ${receiverId} not found!`);
    }
  });

  // Handle calling user
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    const user = getUser(userToCall);
    if (user) {
      io.to(user.socketId).emit("incomingCall", { signal: signalData, from, name });
    }
  });

  // Handle call answer
  socket.on("answerCall", (data) => {
    const user = getUser(data.to);
    if (user) {
      io.to(user.socketId).emit("callAccepted", data.signal);
    }
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users); // Broadcast updated users list after disconnect
  });
});
