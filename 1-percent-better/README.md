# 1 Percent Better

1 Percent Better is a full-stack mobile app for tracking gym performance and workout progress.

This project was created by a team of six as part of the Northcoders Software Development Bootcamp.

This repository contains the frontend application.

The backend repository is here:

`https://github.com/aloan93/be-1-percent-better`

## About

The app was designed to help users track their workouts, review exercises, build sessions, and monitor gym progress over time.

The frontend is built with React Native and Expo and connects to a GraphQL backend.

## Tech Stack

- React Native
- Expo
- React Navigation
- Axios
- GraphQL

## Cloning This Repo

Clone the frontend repository:

```bash
git clone https://github.com/GNicholson95/fe-1-percent-better.git
cd fe-1-percent-better/1-percent-better
```

Then install dependencies:

```bash
npm install
```

## Running the App

Start Expo with:

```bash
npx expo start
```

You can then:

- scan the QR code with Expo Go on Android
- press `a` in the terminal to open Android
- press `i` to open the iOS simulator

This project was developed using Android Studio on Linux and Windows during bootcamp.

## Accounts

To use the live app, you would normally either sign up for a new account or log in with an existing one.

Previously used demo accounts:

- `username: jamesguy` / `password: james123`
- `username: lottie90` / `password: tabby12`
- `username: aloan93` / `password: andrew`

## Current Project Status

This frontend has recently had a maintenance pass to improve startup stability, navigation flow, and login feedback.

Because the hosted backend may be unavailable or time out, the app also includes a `Demo Mode` option on the login screen so the frontend can still be explored for portfolio purposes.

Hosted backend API:

`https://one-percent-better-api-7up3.onrender.com/api/`

## Environment Notes

For local frontend development, this project expects a `.env-development` file.

If you are using the exercise features locally, add your RapidAPI key in:

```env
API_KEY=your_key_here
```

## Demo Mode

If the hosted backend is timing out, you can still explore the app:

1. Launch the app
2. Open the login screen
3. Tap `Continue in Demo Mode`

This bypasses live authentication so the app UI and navigation can still be reviewed.

## Known Limitations

- The hosted backend may time out or be unavailable
- Some screens still depend on live backend or external API responses
- Full functionality requires the backend service to be running correctly

## Backend

If you want the full stack app working again, the best next step is usually to run the backend locally from the backend repository rather than relying on the older hosted deployment.
