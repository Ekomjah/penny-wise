# penny-wise

Penny wise is a simple yet intuitive finance literacy app, targeted to a an audience of teens/pre-teens, who are learning the use of money in the real world, how to use it and how to spend it wisely.
The app begins with the basics - counting money, making change, simple budgeting, through short two-minute Tutorials and longer open-ended Labs.
It's a general-purpose teaching engine, not a fixed curriculum - and it's meant to stay at everyday-basics level, not investing/credit/taxes territory.

### Folder structure

```

///// Folder structure
penny-wise/
├── frontend/          # React + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Express.js + MongoDB
│   ├── server.js
│   ├── models/        # MongoDB models (e.g., User.js)
│   ├── routes/        # API routes (e.g., auth.js, users.js)
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Running Penny Wise project

- To run locally, first clone the project, `https://github.com/freeCodeCamp-Summer-Cohort-2026/penny-wise.git`

-  Install and Run Mongo DB

- It will be setup in Docker

Or you can run with `npm`
To do this, you will have to spin up both the frontend, backend and database instances: 

- First, start initialise the db with docker, then seed it: 
```
docker compose up db
cd backend && npm run seed
```

-Then, start the backend:
```
cd backend
npm install
npm run dev
```

- Finally, the frontend; 
```
cd frontend
npm install
npm run dev
```




<!--
### Creating Backend

## Create Mongo DB

This requires docker installed on the system. [A guide on installing Docker can be found here](https://docs.docker.com/get-started/get-docker/).

before starting the backend service, run this command to start the MongoDB container:

```bash
docker compose up -d
```

It will start the MongoDB on the port 27010, which the Backend service will connect to.-->
