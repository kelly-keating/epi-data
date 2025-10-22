# EPI DATASET

- [Cleaning The Data](#cleaning-the-data)
- [Running The Code](#running-the-code)
- [Background Info](#background-info)

## Cleaning The Data

Before running the main code, you can see the dataset cleaned and preprocessed with the following command:

```sh
npm run clean
```

This will create a cleaned version named `worldData_clean.json` in the `data/` directory. If the file already exists, it will be overwritten with the new one.

_This command will also be run when using the dev command, so don't worry if you forget to run it before starting the project._

## Running The Code

To run the project, use the following commands:

```sh
npm install
npm run dev
```

## Background Info

- This project was generated using vite (React + Typescript)
- I was considering whether the data file should be input to the site itself, but decided against it for now to keep things simple. That functionality can be added later if wanted
