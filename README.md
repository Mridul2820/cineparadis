<p align="center">
    <img src="/public/logo-black.PNG" align="center" width="80"/>
</p>

<div align="center">
    <h1>CineParadis</h1>
</div>

<br />


<div align="center">
    <p>Quick Links</p>
    <a href="CONTRIBUTING.md">Contributing Guide</a> •
    <a href="https://github.com/Mridul2820/cineparadis/issues">Issues</a> •
    <a href="https://github.com/Mridul2820/cineparadis/pulls">Pull Requests</a> •
    <a href="LICENSE">LICENSE</a>
    <br />
    <a href="#tech-stack--">Tech Stack</a> •
    <a href="#demo-">Demo</a> •
    <a href="#screenshot-">Screenshot</a> •
    <a href="#run-locally-">Run Locally</a>
</div>


<br />
<br />

## What it does 🤔
- Our goal is to come up with a website that will provide **trivial information about movies and web shows.**
- Providing users a **minimalistic yet immersive experience.**
- Creating a place for **like minded people to have a discussion on movies and web shows.**
- Providing users to Discover **new movies and web shows.** based on their **interests.**

## Contents 🧧
- Dashborad 
- Trending Movies and TV Series
- Discover Movies and TV Series in different genres
- Search Movies and TV Series
- Movie and TV Series Details(Cast, Crew, Trivia, Photos, Videos etc.)
- Recommendations for Each Movie and TV Series
- Add to Watchlist
- and More...

## Tech Stack 👾
- [React JS](https://reactjs.org/)
- [Context API](https://reactjs.org/docs/context.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router Dom](https://www.npmjs.com/package/react-router-dom)
- [Tailwind](https://tailwindcss.com/)
- [Styled Components](https://styled-components.com/)
- [Firebase](https://firebase.google.com/)
- [Firestore](https://firebase.google.com/docs/firestore/)
- [MUI](https://mui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Demo 🌍
This app is Deployed to Vercel
<br />
[View Demo](https://cineparadis.mridul.tech/login)


## Prerequisites '✔
Required to install and run the software:
* [Node JS 14+](https://nodejs.org/)
* [NPM](https://www.npmjs.com/get-npm)
* [Firebase](https://firebase.google.com/)

## SnapShots 💻
### Login Page
<img src="/public/screenshots/login-page.jpg" align="center"/>

### Trending Page
<img src="/public/screenshots/trending-page.jpg" align="center"/>

### Search Page
<img src="/public/screenshots/search-page.jpg" align="center"/>


## Run Locally 🚀
1. Clone the respository locally
```
git clone https://github.com/Mridul2820/cineparadis.git
```
2. Create a `.env` file in the root directory
```
REACT_APP_TMDB = <YOUR_TMDB_API_KEY>
REACT_APP_FIREBASE = <YOUR_FIREBASE_TOKEN>
```
- **```TMDB API KEY```: Get your `TMDB_API_KEY` by signing in to [TMDB](https://www.themoviedb.org/documentation/api) account.**
You can apply for an API key by clicking the **"API"** link from the left hand sidebar within your account settings page. You need to have a legitimate business **name, address, phone number and description** to apply for an API key.
- ```FIREBASE TOKEN```: Go to **[Firebase](https://firebase.google.com/)** and navigate to **Firebase Console**. You need to **Sign Up with you Gmail.**
Create an App and get your `Firebase Token`.
You Also need to **enable Google Sign In** in the **Sign-in methods**.
Enable **Firestore** in the Firebase Console and Create a Collection called ```users```.

3. Install the `node_modules`
```
npm install
```
4. Start the Server
```
npm start
```

## How to contribute? 💻
<a href="CONTRIBUTING.md">Contributing Guide</a>

## All the best! 🥇