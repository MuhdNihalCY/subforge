#!/bin/bash

# Set project name
PROJECT_NAME="backend-rest-api"
# Check if the project directory already exists
if [ -d "$PROJECT_NAME" ]; then
  echo "❌ Project directory '$PROJECT_NAME' already exists. Please choose a different name or remove the existing directory."
  exit 1
fi
# Create project directory
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

echo "📁 Creating REST API project: $PROJECT_NAME"

# Initialize npm project
npm init -y > /dev/null

# Install dependencies
npm install express dotenv > /dev/null
npm install --save-dev nodemon > /dev/null

# Create folder structure
mkdir controllers routes middlewares config models

# Create .env
cat <<EOL > .env
PORT=3000
NODE_ENV=development
EOL

# Create app.js
cat <<'EOL' > app.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
EOL

# Create server.js
cat <<'EOL' > server.js
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
EOL

# Create routes/userRoutes.js
cat <<'EOL' > routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
EOL

# Create controllers/userController.js
cat <<'EOL' > controllers/userController.js
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
EOL

# Create middlewares/errorHandler.js
cat <<'EOL' > middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
};
EOL

# Add dev script
npx json -I -f package.json -e 'this.scripts={"start":"node server.js","dev":"nodemon server.js"}'

echo "✅ REST API boilerplate created in $PROJECT_NAME"
echo "👉 cd $PROJECT_NAME && npm run dev"
