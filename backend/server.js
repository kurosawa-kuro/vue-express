import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAPIBackend } from 'openapi-backend';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const definitionYaml = readFileSync(join(__dirname, 'openapi.yaml'), 'utf8');
const definition = yaml.load(definitionYaml);

const api = new OpenAPIBackend({
  definition,
  handlers: {
    getUsers: async (c, req, res) => {
      try {
        const users = await prisma.user.findMany({
          include: {
            microposts: true
          }
        });
        return res.json(users);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    getMicroposts: async (c, req, res) => {
      try {
        const microposts = await prisma.micropost.findMany({
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        return res.json(microposts);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    getMicropostById: async (c, req, res) => {
      try {
        const { id } = c.request.params;
        const micropost = await prisma.micropost.findUnique({
          where: { id: parseInt(id) },
          include: {
            user: true
          }
        });
        
        if (!micropost) {
          return res.status(404).json({ error: 'Micropost not found' });
        }
        
        return res.json(micropost);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    createMicropost: async (c, req, res) => {
      try {
        const { title, userId } = c.request.requestBody;
        
        const user = await prisma.user.findUnique({
          where: { id: userId }
        });
        
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
        
        const micropost = await prisma.micropost.create({
          data: {
            title,
            userId
          },
          include: {
            user: true
          }
        });
        
        return res.status(201).json(micropost);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    notFound: (c, req, res) => {
      return res.status(404).json({ error: 'Not found' });
    },

    validationFail: (c, req, res) => {
      return res.status(400).json({ error: c.validation.errors });
    }
  }
});

api.init();

app.use((req, res) => api.handleRequest(req, req, res));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
