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
  // Check if the user is already in the array
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId }); // Add user if not already in the array
    console.log(`User added: ${userId}, with socket ID: ${socketId}`);
    console.log(users.length)
    console.log("Current users:", users);
  } else {
    console.log(`User ${userId} already exists.`);
  }
};

// Remove user from the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(`User removed: Socket ID: ${socketId}`);
  console.log("Current users:", users);
};

// Get user by userId
const getUser = (userId) => {
  console.log("users.length = "+users.length)
  console.log("Searching for userId:", userId);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Listen for when a user joins
  socket.on("addUser", (userId) => {
    console.log("Adding user:", userId);
    addUser(userId, socket.id); // Add the user when they connect
    io.emit("getUsers", users); // Broadcast all connected users
  });

  // Send and get messages
  socket.on("SendMessage", ({ senderId, receiverId, text }) => {
    console.log(`Message received from: ${senderId} to: ${receiverId}, message: ${text}`);
    const user = getUser(receiverId);
    console.log(user)
    
    if (user) {
      console.log(`Message sent to user ${receiverId}, socket ID: ${user.socketId}`);
      console.log("user.socketId = "+user.socketId)
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log(`User with ID ${receiverId} not found!`);
    }
  });

  

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users); // Broadcast updated users list after disconnect
  });
});
