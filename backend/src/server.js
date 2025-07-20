const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { microposts: true }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await prisma.user.create({
      data: { name },
      include: { microposts: true }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { microposts: true }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.get('/api/users/:id/microposts', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { microposts: true }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user.microposts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user microposts' });
  }
});

app.get('/api/microposts', async (req, res) => {
  try {
    const microposts = await prisma.micropost.findMany({
      include: { user: true }
    });
    res.status(200).json(microposts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch microposts' });
  }
});

app.post('/api/microposts', async (req, res) => {
  try {
    const { title, userId } = req.body;
    const micropost = await prisma.micropost.create({
      data: { title, userId: parseInt(userId) },
      include: { user: true }
    });
    res.status(201).json(micropost);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create micropost' });
  }
});

app.get('/api/microposts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const micropost = await prisma.micropost.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });
    if (!micropost) {
      return res.status(404).json({ error: 'Micropost not found' });
    }
    res.status(200).json(micropost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch micropost' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`API endpoints: http://localhost:${port}/api/*`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
