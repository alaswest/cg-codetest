# README

## Overview

This code repository houses the frontend and backend codebases for my Collinson Group code test challenge. The objective of this challenge is as follows:

> Build a well-structured, scalable, and maintainable web application that accepts a city or town and returns a ranking of how desirable it will be to visit for various activities over the next 7 days, based on weather data.
>
> Activities to Rank
>
> - Skiing
> - Surfing
> - Outdoor sightseeing
> - Indoor sightseeing

## How to run

### Prerequisites

- Node.js v22 or higher

### Running Locally

1. Clone the repository

2. Start the backend server:

   ```bash
   cd server
   npm install
   npm run dev
   ```

   The server will start on http://localhost:3000

3. In a new terminal, start the frontend:
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

## Requirements Met

### Core Functionality

- ✅ City/Town Input: Users can search for any city or town using a search input that leverages OpenMeteo's Geocoding API
- ✅ 7-Day Forecast: The application fetches and displays weather data for the next 7 days
- ✅ Activity Rankings: Each day is scored and ranked for different activities based on weather conditions
- ✅ Technology Stack: Utilised Collinsons group strategic tech stack; NodeJS, TypeScript and Graphql on the backend, and React TypeScript on the frontend.

### Technical Implementation

- ✅ Well Structured: Clear separation between frontend and backend. The backend follows a clean, layered architecture:

  - _Presentation Layer_: GraphQL resolvers handle incoming requests and delegate to business logic. This layer is intentionally thin to maintain flexibility - the core business logic remains independent of the API interface, allowing for easy addition of alternative interfaces (REST, RPC, etc.) in the future.
  - _Business Logic Layer_: Core business logic resides in the `services/` directory. This layer is framework-agnostic and contains the activity scoring algorithms, weather analysis, and business rules. It's designed to be easily testable and maintainable.
  - _Data Layer_: External service integrations (like OpenMeteo) are abstracted behind interfaces in this layer. This separation allows for easy swapping of data providers or adding caching mechanisms without affecting the business logic.

- ✅ Scalability: The application is designed with scalability in mind:

  - Stateless architecture enables horizontal scaling
  - Caching opportunities identified at the data layer
  - Modular design allows for independent scaling of components

- ✅ Maintainability:

  - Configurable activity scoring system
  - Unit tests for critical business logic
  - Clear separation of concerns through layered architecture
  - Type safety throughout with TypeScript
  - Well-documented code with clear interfaces between layers

### Activity Scoring System

Each activity is evaluated using specific weather criteria. This structured in a configuration file to create a flexible implementation that could be tweaked in future for more accurate scoring results:

1. Skiing

   - Requires temperatures below freezing
   - Snowfall is heavily weighted
   - Wind speed impacts suitability

2. Surfing

   - Moderate temperatures preferred
   - Wind speed is a critical factor
   - Precipitation reduces suitability

3. Outdoor Sightseeing

   - Comfortable temperature range (15-25°C)
   - Low precipitation preferred
   - Moderate wind conditions ideal

4. Indoor Sightseeing
   - Scored inversely to outdoor conditions
   - Higher scores during inclement weather
   - Serves as a reliable alternative when outdoor activities are unsuitable

## Development Approach

The development process followed a structured, iterative approach:

1. Initial Development

   - Created a minimal viable product with end-to-end functionality
   - Official documentation was used, rather than AI to ensure that application foundations followed best practices.
   - Established core features and basic workflow

2. Refinement

   - Implemented a configurable scoring system for flexibility
   - Established clear separation between application layers
   - Added caching for improved performance

3. QA
   - Added comprehensive test coverage for critical components
   - Ensure TypeScript types were accurate
   - Added lightweight documentation throughout README and inline comments.

### How AI tooling supported development

The Cursor Editor was used throughout implementation to improve on implementation time:

- Autocomplete was used regularly, assisting in repetitive tasks like writing tests, declaring variables and types and import statement management.
- The chat prompt was also used for basic tasks, such as bootstrapping new files, styling ui components and refactoring.

### Trade offs

- Frontend Development: Once the basic journey had been complete, any future implementation on the frontend was deprioritised. Given time constraints and the given requirements, it was deemed that enhancing the UX would not provide any value-add
- Scoring Functionality: The application will calculate a score depending on the weather condition configuration. The configured threshold values have not been fully assessed. It was deemed more important that a flexible/configurable structure was put in place that could be easily tweaked.
- Search Functionality: The city search could be further improved to handle multiple results. Currently it will only return the first result it finds. This was deprioritised given no explicit requirement was made, however adding could provide value to overall product experience.
- OpenMeteo Integration: Ideally the implementation would avoid utilising their package to minimise any dependencies. Given the official documentation was utilising the package, this was done to save time.
- Test Coverage: Testing was only focussed on critical behaviour to optimise time
- Caching Strategy: Only one of the OpenMeteo API calls have been cached. Future enhacements would be to also cache the weather forecast result and set a short expiration time. This could also be future enhanced by using a distributed caching service like redis to avoid in memory cache and enable cache usage in a distributed environment.
- Error Handling: Basic validation was implemented on the frontend to prevent a user from submitting an empty value, however there is no protection on the api for this. This was deprioritised given time constraints and a short term solution was implemented.
