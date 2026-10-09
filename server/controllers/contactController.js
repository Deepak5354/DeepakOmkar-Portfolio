const portfolioData = require('../utils/mockData');

let messages = [
  {
    id: '1',
    name: 'Sample Recruiter',
    email: 'hello@example.com',
    subject: 'Portfolio discussion',
    message: 'Hello! I would like to connect about a full-stack developer opportunity.',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

const submitContactMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    subject,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  messages.unshift(newMessage);
  return res.status(201).json({ message: 'Your message has been sent successfully.', data: newMessage });
};

const getContactMessages = (req, res) => {
  res.status(200).json(messages);
};

const deleteContactMessage = (req, res) => {
  const index = messages.findIndex((msg) => msg.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Message not found.' });
  }

  messages.splice(index, 1);
  return res.status(200).json({ message: 'Message deleted successfully.' });
};

module.exports = { submitContactMessage, getContactMessages, deleteContactMessage };
