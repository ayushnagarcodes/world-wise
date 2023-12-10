# World Wise

<br />

Watch live <a href="https://ayush-world-wise.netlify.app/" target="_blank">here</a> ➡️

<br />

## Key Features

- Keep a record of the cities you've explored worldwide.
- Choose cities effortlessly through an interactive map interface.
- Log the date of your visit and add personalized notes.

<br />

## Tools and Packages

- **Build Tool:** [Vite](https://vitejs.dev/) for efficient project building.
- **Map Integration:** Utilizes [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/) for the interactive map.
- React Router to implement routing.
- This project uses Netlify functions to create an API endpoint to get the required data, post new data and delete existing entries.
- To run the project locally, I have used `json-server` node package.
    
<br />

## Project Setup

Make sure `node` and `npm` are installed. Run the following command in the terminal:

1. `npm i` or `npm install`
2. `npm run dev`
3. Open a new terminal and enter `npm run server` command.
4. To run locally: Copy `CitiesContextLocal.jsx` inside `data/` to `src/contexts` and rename it to `CitiesContext.jsx` (replace any existing files).
5. To set up Netlify Functions for deployment on Netlify: Copy `CitiesContextNetlify.jsx` inside `data/` to `src/contexts` and rename it to `CitiesContext.jsx` (replace any existing files). \
**Note:** The folder `netlify` and the file `public/_redirects` are necessary for the app to work when deployed on Netlify.
