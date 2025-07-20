# Vue Express Fullstack Sample Application

A sample fullstack application demonstrating the integration of Vue 3 frontend with Express + OpenAPI + Prisma backend.

## 🛠 Tech Stack

### Frontend
- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js + Express
- **API Definition**: OpenAPI (openapi-backend)
- **ORM**: Prisma + SQLite
- **Environment**: dotenv
- **CORS**: cors

## 📊 Data Models

- **User**: `id` (PK), `name`, `createdAt`, `updatedAt`
- **Micropost**: `id` (PK), `title`, `userId` (FK), `createdAt`, `updatedAt`
- **Relationship**: User 1:* Micropost

## 🚀 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- SQLite (automatically handled by Prisma)

## ⚙️ Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/kurosawa-kuro/vue-express.git
cd vue-express
```

2. Checkout the feature branch:
```bash
git checkout devin/1753047578-vue-express-fullstack-sample
```

## 📦 Installation

Install all dependencies for root, frontend, and backend:

```bash
npm run install:all
```

This command will:
- Install root dependencies (concurrently)
- Install frontend dependencies (Vue 3, Vite, Tailwind CSS, etc.)
- Install backend dependencies (Express, Prisma, OpenAPI backend, etc.)

## 🗄️ Database Setup

Set up the database with Prisma:

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

## 🚀 Development

Start both frontend and backend servers concurrently:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3001 (Express server)

### Individual Server Commands

If you need to start servers individually:

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

## 🧪 Verification Steps

### 1. Access the Application
Open your browser and navigate to http://localhost:5173

### 2. Test Dashboard
- Verify the dashboard shows user and post statistics
- Check that recent posts are displayed

### 3. Test Users Page
- Navigate to the Users page
- Verify all users are listed with their posts
- Check user avatars and post counts

### 4. Test Microposts Page
- Navigate to the Microposts page
- Verify all posts are displayed with user information
- Test creating a new post:
  - Fill in the post title
  - Select an author from the dropdown
  - Click "Create Post"
  - Verify the new post appears at the top of the list

### 5. API Endpoints Testing

You can also test the API endpoints directly:

```bash
# Get all users
curl http://localhost:3001/users

# Get all microposts
curl http://localhost:3001/microposts

# Get specific micropost
curl http://localhost:3001/microposts/1

# Create new micropost
curl -X POST http://localhost:3001/microposts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test post","userId":1}'
```

## 📁 Project Structure

```
vue-express/
├── frontend/                 # Vue 3 frontend
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/          # Page components
│   │   ├── stores/         # Pinia stores
│   │   └── router/         # Vue Router config
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                 # Express backend
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.js         # Database seeding
│   ├── openapi.yaml        # API specification
│   ├── server.js           # Express server
│   ├── .env               # Environment variables
│   └── package.json
├── src/template-admin/     # Reference HTML templates
└── package.json           # Root package.json
```

## 🔧 Available Scripts

### Root Level
- `npm run install:all` - Install all dependencies
- `npm run dev` - Start both servers concurrently
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start Express server with watch mode
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database

## 🎯 Features Implemented

- ✅ Vue 3 components with Composition API
- ✅ Tailwind CSS styling based on template-admin
- ✅ Pinia state management
- ✅ Vue Router navigation
- ✅ Express REST API with OpenAPI specification
- ✅ Prisma ORM with SQLite database
- ✅ CRUD operations (Create & Read only)
- ✅ Real-time UI updates
- ✅ Responsive design
- ✅ Error handling and loading states

## 🚫 Constraints

- JavaScript only (no TypeScript)
- No authentication system
- No test code
- Only Create and Read operations (no Update/Delete)
- Based on existing template-admin styling

## 🐛 Troubleshooting

### Port Already in Use
If you get port conflicts:
- Frontend (5173): Change port in `frontend/vite.config.js`
- Backend (3001): Change PORT in `backend/.env`

### Database Issues
Reset the database:
```bash
rm backend/dev.db
npm run db:migrate
npm run db:seed
```

### Dependencies Issues
Clean install:
```bash
rm -rf node_modules frontend/node_modules backend/node_modules
rm package-lock.json frontend/package-lock.json backend/package-lock.json
npm run install:all
```

## 📝 Notes

This is a sample application demonstrating fullstack development with modern web technologies. The styling is based on the existing template-admin components found in `src/template-admin/`.
