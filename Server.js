const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Quote = require('./models/Quote');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

app.get('/api/quote/today', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const quote = await Quote.findOne({ date: today }) || await Quote.findOne();
  res.json(quote);
});

app.post('/api/quotes', async (req, res) => {
  const { text, author, date } = req.body;
  const quote = new Quote({ text, author, date });
  await quote.save();
  res.json({ message: 'Quote added' });
});

app.post('/api/quotes/:id/favorite', async (req, res) => {
  const { userId } = req.body;
  await User.findByIdAndUpdate(userId, { $addToSet: { favorites: req.params.id } });
  res.json({ message: 'Quote favorited' });
});

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
