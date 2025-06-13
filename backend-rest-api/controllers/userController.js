exports.getUsers = (req, res) => {
  res.status(200).json({ message: 'Get all users' });
};

exports.createUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.status(201).json({ message: \`User \${name} created\` });
};
