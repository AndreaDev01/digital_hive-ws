const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Estrai il token dall'header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Salva i dati decodificati nel request
    next(); // Prosegui con la richiesta
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
