const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //Genera il token JWT con scadenza di 30 minuti
    const payload = {
      userId: user._id,
      username: user.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });


    // Success
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        token: token
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
