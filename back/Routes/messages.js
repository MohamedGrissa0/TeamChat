const router = require("express").Router();
const Message = require("../Models/Message");


router.post('/', async (req, res) => {
    const { sender, text, conversationId } = req.body;

    if (!sender || !text || !conversationId) {
        return res.status(400).json({ message: "All fields (sender, text, conversationId) are required" });
    }
    const newMessage = new Message(req.body);
    console.log(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/last/:userId/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;
  
    try {
      // Find the last message between the two users
      const lastMessage = await Message.findOne({
        $or: [
          { sender: userId, receiver: friendId },
          { sender: friendId, receiver: userId }
        ]
      })
      .sort({ createdAt: -1 }) // Sort by date descending
      .populate('sender', 'username avatar') // Populate sender data
      .exec();
  
      res.status(200).json(lastMessage || { text: "No messages yet" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch last message: " + err.message });
    }
});

  


router.get('/:convId', async (req, res) => {
    console.log(req.params.convId)
    try {
        const msgs = await Message.find({
            conversationId : req.params.convId
        })

        res.status(200).json(msgs)
    }
    catch (err) {
        res.status(500).json(err)

    }
})

module.exports = router;
