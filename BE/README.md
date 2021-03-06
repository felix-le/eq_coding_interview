## Work Sample for Product Aspect, Node.js Variant

[What is this for?](https://github.com/EQWorks/work-samples#what-is-this)

### Setup and Run

The following are the recommended options, but you're free to use any means to get started.

#### Remote Option: Glitch.com

1. [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/EQWorks/ws-product-nodejs)
2. Populate `.env` file with the environment variables given in the problem set we send to you through email
3. Click on `Show Live` and you should see `Welcome to EQ Works 😎`

#### Local Option 1: Node.js 6.10+

1. Clone this repository
2. Install Node.js dependencies `$ npm install`
3. Set environment variables given in the problem set we send to you through email and run `$ npm run dev`
4. Open your browser and point to `localhost:5555` and you should see `Welcome to EQ Works 😎`

#### Local Option 2: Docker (`docker-compose` needed)

1. Clone this repository
2. Create and populate `.env` file with the environment variables given in the problem set we send to you through email
3. `$ docker-compose up` (or `$ docker-compose up -d` to run as a daemon)
4. Open your browser and point to `localhost:5555` and you should see `Welcome to EQ Works 😎`

### Notes on working through the problems

Make sure any additional Node.js level dependencies are properly added in `package.json`. We encourage a healthy mixture of your own implementations, and good choices of existing open-source libraries/tools. We will comment in the problems to indicate which ones cannot be solved purely through an off-the-shelf solution.

2a - Front-end Track
Build UI components that leverages the API server from problem 1 to solve problems below.

A. client-side general chart visualizations
Implement one or more types of charts that can be used to effectively visualize data supplied from the API endpoints. Users should be able to pick different metrics to visualize and compare with others.

B. client-side data table
Implement a functional data table that can be used to browse through data supplied from the API endpoints. The data table should allow users to fuzzy search on meaningful values (such as POI names), and matching rows should be highlighted.

C. client-side geo visualizations
Implement a functional map-based data visualization based on different POI-bound metrics. Users should be able to select different metrics and be able to distinguish each metrics' intensity of different POIs. The map should also allow a certain degree of flexibility for users to zoom in and out, and allow users to see a "clustered" indicator when more than one POIs are too close to each other at the given zoom level.

You will likely need to implement data join between the POIs and other datasets.
