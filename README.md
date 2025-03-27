# Weather App

This is a weather application built with React and Vite. The app fetches weather data and displays current and hourly forecasts.

## Features
- Search for weather by location
- Display current weather conditions
- Show hourly weather forecast
- Responsive UI

## Prerequisites
Ensure you have the following installed before proceeding:
- [Node.js](https://nodejs.org/) (Recommended version: 16 or later)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

## Installation

1. Clone the repository:
   ```sh
   git clone --branch Weather_App --single-branch https://github.com/AloysJehwin/NodeJS_Projects
   cd NodeJS_Projects
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following line to the `.env` file:
     ```sh
     VITE_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual API key.

## Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173/` by default.

2. To build the application for production:
   ```sh
   npm run build
   ```

3. To preview the production build:
   ```sh
   npm run preview
   ```

## Folder Structure
```
weather-app/
│── public/            # Static assets
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── constants.js   # App constants
│   ├── App.jsx        # Main application file
│   ├── main.jsx       # Entry point
│── .env               # Environment variables
│── .gitignore         # Ignored files
│── package.json       # Project dependencies
│── vite.config.js     # Vite configuration
```

## Troubleshooting
- If you encounter module resolution errors, ensure all files are correctly imported.
- If environment variables are not loading, restart the development server.
- Check that your API key is valid and correctly set in the `.env` file.

## License
This project is licensed under the MIT License.

