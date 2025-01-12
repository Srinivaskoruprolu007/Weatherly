# Weather App

A weather application that allows users to view weather forecasts for their favorite cities. The app enables users to add cities to their favorites and remove them as needed, while providing current and forecasted weather data using OpenWeather API.

## Features

- **Search for cities**: Users can search for cities and view current weather data.
- **Favorite cities**: Users can save their favorite cities and view weather details for them.
- **Weather forecast**: Displays the 5-day weather forecast for each favorite city.
- **Responsive design**: The application is designed to work across different devices, including tablets and phones.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **TypeScript**: Provides static typing for better development experience.
- **React Query**: Fetches and caches weather data from OpenWeather API.
- **Lucide React**: Icons library for UI components.
- **Sonner**: Toast notification library for providing feedback to users.
- **React Router**: Manages routing within the application.
- **OpenWeather API**: Provides weather data (current weather and forecasts).

## Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2. **Install dependencies**:

    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install required dependencies:

    ```bash
    npm install
    ```

3. **Setup environment variables**:

    Create a `.env` file in the root directory and add your OpenWeather API key:

    ```
    REACT_APP_OPENWEATHER_API_KEY=your-api-key-here
    ```

4. **Run the application**:

    Start the development server:

    ```bash
    npm start
    ```

    This will open the app in your browser at `http://localhost:3000`.

## Usage

1. **Add a city to favorites**:
    - Search for a city by name or coordinates.
    - Click the "Add to Favorites" button to add the city to your list.

2. **View the weather**:
    - The current temperature and weather conditions will be displayed along with a 5-day forecast.

3. **Remove a city from favorites**:
    - Click the "Remove" button on any city in your favorites list to remove it.

4. **Responsive design**:
    - The application automatically adjusts for various screen sizes.

## Folder Structure

