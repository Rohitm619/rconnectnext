import Chat from "../model/Chat";

// export const getMessages = async (req, res) => {
//   const userId = req.body.userId;
//   let messages;
//   try {
//     messages = await Chat.find({ sender: userId });
//   } catch (err) {
//     console.log(err);
//   }

//   if (!messages) {
//     return res.status(404).json({ message: "No messages found" });
//   }

//   return res.status(200).json({ messages });
// };

// export const createMessage = async (req, res) => {
//   const message = req.body;
//   let result;
//   try {
//     result = await Chat.create(message);
//   } catch (err) {
//     console.log(err);
//   }

//   if (!result) {
//     return res.status(404).json({ message: "No messages found" });
//   }

//   return res.status(200).json({ result });
// };

export const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new Chat({
      members: [firstId, secondId],
    });

    const result = await newChat.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
