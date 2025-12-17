# Quickstart Guide: Docusaurus Homepage

This guide provides the essential steps to set up and run the Docusaurus frontend locally.

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **npm**: Version 9.x or higher (usually comes with Node.js).
- A terminal or command prompt.

## 1. Installation

First, create the Docusaurus project and navigate into the `frontend` directory.

```bash
# This command sets up the Docusaurus project in a 'frontend' sub-directory
npx create-docusaurus@latest frontend classic --typescript
```

## 2. Install Dependencies

Once the project is created, move into the new `frontend` directory and install the necessary dependencies.

```bash
# Navigate into the newly created project folder
cd frontend

# Install project dependencies
npm install
```

## 3. Running the Development Server

After the installation is complete, you can start the local development server.

```bash
# This command starts the live-reloading development server
npm start
```

By default, the site will be available at `http://localhost:3000`. The server will automatically reload when you make changes to the source files.
