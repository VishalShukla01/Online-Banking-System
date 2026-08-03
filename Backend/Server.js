
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware - allows JSON data and React connection
app.use(express.json());
app.use(cors());

// MongoDB Connection - connects to local MongoDB Compass
mongoose.connect('mongodb://localhost:27017/simplebank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected!'))
.catch(err => console.log('❌ MongoDB Error:', err));

// User Schema - defines how user data looks
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 10000 },
  createdAt: { type: Date, default: Date.now }
});

// Transaction Schema - defines how transaction data looks
const TransactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  type: { type: String, required: true }, // 'debit' or 'credit'
  amount: { type: Number, required: true },
  recipient: { type: String, default: null },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Create Models - these interact with MongoDB
const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

// ============ API ROUTES ============

// 1. REGISTER - Create new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists!' });
    }
    
    // Create new user
    const newUser = new User({ username, password, balance: 10000 });
    await newUser.save();
    
    // Create initial transaction
    const initialTxn = new Transaction({
      username,
      type: 'credit',
      amount: 10000,
      description: 'Initial deposit'
    });
    await initialTxn.save();
    
    res.json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 2. LOGIN - Check credentials and return user data
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }
    
    res.json({ message: 'Login successful!', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 3. GET USER DATA - Fetch user balance and info
app.get('/api/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 4. GET TRANSACTIONS - Fetch user's transaction history
app.get('/api/transactions/:username', async (req, res) => {
  try {
    const transactions = await Transaction.find({ 
      username: req.params.username 
    }).sort({ date: -1 }); // Sort by newest first
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 5. ADD TRANSACTION - Create new transaction (deposit, withdraw, transfer)
app.post('/api/transaction', async (req, res) => {
  try {
    const { username, type, amount, recipient, description } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update balance
    if (type === 'debit') {
      if (user.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance!' });
      }
      user.balance -= amount;
    } else {
      user.balance += amount;
    }
    
    await user.save();
    
    // Create transaction record
    const newTransaction = new Transaction({
      username,
      type,
      amount,
      recipient,
      description
    });
    await newTransaction.save();
    
    res.json({ 
      message: 'Transaction successful!', 
      balance: user.balance,
      transaction: newTransaction 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 6. TRANSFER - Transfer money between users
app.post('/api/transfer', async (req, res) => {
  try {
    const { sender, recipient, amount } = req.body;
    
    // Find both users
    const senderUser = await User.findOne({ username: sender });
    const recipientUser = await User.findOne({ username: recipient });
    
    if (!senderUser || !recipientUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (senderUser.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance!' });
    }
    
    // Update balances
    senderUser.balance -= amount;
    recipientUser.balance += amount;
    
    await senderUser.save();
    await recipientUser.save();
    
    // Create transactions for both users
    const senderTxn = new Transaction({
      username: sender,
      type: 'debit',
      amount,
      recipient,
      description: `Transfer to ${recipient}`
    });
    
    const recipientTxn = new Transaction({
      username: recipient,
      type: 'credit',
      amount,
      recipient: sender,
      description: `Transfer from ${sender}`
    });
    
    await senderTxn.save();
    await recipientTxn.save();
    
    res.json({ 
      message: 'Transfer successful!', 
      balance: senderUser.balance 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
