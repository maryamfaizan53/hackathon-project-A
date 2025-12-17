# Quickstart Guide

This guide explains how to run the documentation website locally.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Development Server

1.  From the `frontend` directory, run the following command:
    ```bash
    npm start
    # or
    yarn start
    ```
2.  This will start a local development server and open up a browser window. By default, the site will be available at `http://localhost:3000`.

## Building the Static Site

To generate a static build of the website, run the following command from the `frontend` directory:
```bash
npm run build
# or
yarn build
```
The generated files will be in the `frontend/build` directory.
