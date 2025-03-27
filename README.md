# Movie Explorer

Movie Explorer is a web application built with Node.js and Vite that fetches and displays movie data from [The Movie Database (TMDB) API](https://www.themoviedb.org/).

## Features

- Search for movies using TMDB API
- Display movie details including title, overview, rating, and poster
- Responsive and fast UI with Vite
- Backend setup with Node.js and Express

## Project Structure

```
Movie-Explorer/
│-- backend/
│   ├── server.js           # Express server setup
│   ├── .env                # Environment variables (API key)
│-- frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML file
│-- package.json            # Dependencies and scripts
│-- README.md               # Documentation
```

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- TMDB API Key (Get one from [TMDB](https://www.themoviedb.org/))

## Installation

Clone the repository:

```sh
git clone --branch Movie-Explorer --single-branch https://github.com/AloysJehwin/NodeJS_Projects
cd NodeJS_Projects
```

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your TMDB API key:
   ```sh
   TMDB_API_KEY=your_api_key_here
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Usage

The backend acts as a proxy to fetch data from TMDB. Example endpoints:

- `GET /api/movies?query=batman` - Search for movies
- `GET /api/movie/:id` - Get movie details

## Deployment

To deploy the frontend:
```sh
npm run build
```
Then serve the built files using a static server.

To deploy the backend, use a hosting service like Heroku or Render.

## Contributing

Feel free to submit issues and pull requests!

## License

MIT License

