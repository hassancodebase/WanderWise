# WanderWise Travel Recommendation Website

A frontend-only travel recommendation website built for the project requirements.

## Required files

- `travel_recommendation.html`
- `travel_recommendation.js`
- `travel_recommendation.css`
- `travel_recommendation_api.json`

## Data

The recommendation data is based on the supplied JSON file. Its countries are Australia, Japan, and Brazil, with two cities each; its temples are Angkor Wat and Taj Mahal; and its beaches are Bora Bora and Copacabana Beach. The supplied placeholder image URLs were changed to local project image paths so every recommendation has a working image.

## Run locally

Because the JavaScript uses `fetch()`, run through a local web server rather than opening the HTML with `file://`.

For example:
`python -m http.server 8000`

Then visit:
`http://localhost:8000/travel_recommendation.html`

## Search

Supported keywords (case-insensitive and singular/plural):

- beach / beaches
- temple / temples
- country / countries

Country results are the cities contained in the supplied `countries` data, with their original descriptions and images.

## GitHub Pages

Upload the project to a public GitHub repository and enable GitHub Pages from the repository's Pages settings. Use the generated public URL for submission.
