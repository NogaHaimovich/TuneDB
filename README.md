# TuneDB 🎵

A modern music discovery and playlist management application built with React, TypeScript, and Node.js. TuneDB integrates with the Deezer API to provide users with access to top-rated songs, artists, albums, and the ability to create and manage personal playlists.

## 🌐 Live Demo

Check out the live application: **[https://tunedb.netlify.app/](https://tunedb.netlify.app/)**


## ✨ Features

- 🎶 **Music Discovery**: Browse top-rated songs, artists, and fresh releases
- 🔍 **Advanced Search**: Search for songs, artists, and albums with real-time suggestions
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🎵 **Playlist Management**: Create, edit, and manage your personal playlists
- 👤 **User Authentication**: Secure sign-up and sign-in functionality
- 🎨 **Modern UI**: Built with Material-UI and custom SCSS styling
- ⚡ **Fast Performance**: Optimized with Vite and React 19

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Material-UI** for UI components
- **React Router** for navigation
- **SCSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Deezer API** integration
- **JWT** for authentication
- **MongoDB** with Mongoose (for user data and playlists)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (for user data and playlists)

### MongoDB Setup

You have several options for MongoDB:

**Option 1: Local MongoDB Installation**
1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

**Option 2: MongoDB Atlas (Cloud - Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the "Connect" button
4. Replace the `MONGODB_URI` in your `.env` file with your Atlas connection string

**Option 3: Docker (Alternative)**
```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/TuneDB.git
   cd TuneDB
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/tunedb
   JWT_SECRET=your-super-secret-jwt-key-here
   DEEZER_API_URL=https://api.deezer.com
   ```
   
   **Important Notes:**
   - Replace `MONGO_URI` with your actual MongoDB connection string
   - For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/tunedb`
   - Generate a strong JWT secret (you can use: `openssl rand -base64 32`)
   - The database name `tunedb` will be created automatically when you first run the app

5. **Start the development servers**
   
   **Option 1: Start both frontend and backend together**
   ```bash
   npm run dev:full
   ```
   
   **Option 2: Start them separately**
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
TuneDB/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── Services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/               # Backend source code
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── models/        # Database models
│   │   └── middleware/    # Express middleware
└── public/                # Static assets
```

## 🎯 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm run dev:backend` - Start backend development server
- `npm run dev:full` - Start both frontend and backend

## 🔧 API Endpoints

### Music Data (Deezer Integration)
- `GET /api/deezer/topRatedSongs?limit=5` - Get top-rated songs
- `GET /api/deezer/topRatedArtists?limit=5` - Get top-rated artists
- `GET /api/deezer/newSongs?limit=5` - Get new releases
- `GET /api/deezer/search?q=query` - Search for music
- `GET /api/deezer/record?id=track_id` - Get track details
- `GET /api/deezer/artist?id=artist_id` - Get artist details
- `GET /api/deezer/album?id=album_id` - Get album details

### User Management
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Playlists
- `GET /api/playlists` - Get user playlists
- `POST /api/playlists` - Create new playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist

## 🎨 Key Features Explained

### Music Discovery
- Browse trending songs and artists
- Discover new releases
- Search with autocomplete suggestions
- View detailed information about tracks, artists, and albums

### Playlist Management
- Create custom playlists
- Add/remove songs from playlists
- Organize your music collection
- Share playlists with others

### User Experience
- Responsive design for all screen sizes
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Deezer API](https://developers.deezer.com/) for music data
- [Material-UI](https://mui.com/) for UI components
- [Vite](https://vitejs.dev/) for the build tool
- [React](https://reactjs.org/) for the frontend framework

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoDB connection failed"**
- Make sure MongoDB is running on your system
- Check that the `MONGO_URI` in your `.env` file is correct
- For local MongoDB, ensure it's running on port 27017
- For MongoDB Atlas, check your connection string and network access settings

**Error: "MONGO_URI is not defined"**
- Make sure you have a `.env` file in the `backend` directory
- Verify the environment variable is named `MONGO_URI` (not `MONGODB_URI`)

**Database not found**
- The database `tunedb` will be created automatically when you first register a user
- No manual database creation is required

### Common Issues

**Port already in use**
- Change the `PORT` in your backend `.env` file to a different port (e.g., 3002)
- Update the `VITE_API_URL` in your frontend `.env` file accordingly

**CORS errors**
- Make sure your frontend is running on the correct port (default: 5173)
- Check the CORS configuration in `backend/src/index.ts`

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the existing documentation
- Review the code comments for implementation details

---

**Happy listening! 🎵**
