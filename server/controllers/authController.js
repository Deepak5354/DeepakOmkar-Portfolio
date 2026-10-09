const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminUser = {
  id: 1,
  email: 'admin@portfolio.dev',
  passwordHash: bcrypt.hashSync('admin123', 10),
  role: 'admin',
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const isValid = email === adminUser.email && bcrypt.compareSync(password, adminUser.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: adminUser.id, email: adminUser.email, role: adminUser.role },
    process.env.JWT_SECRET || 'portfolio-secret',
    { expiresIn: '8h' }
  );

  return res.status(200).json({
    token,
    user: { id: adminUser.id, email: adminUser.email, role: adminUser.role },
  });
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = { login, logout };
