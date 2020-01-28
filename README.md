This Project was build by me (Mohamad Farhat) on 28/1/2019, i call it Artista, and I used spotify Api to search for artists and their albums.

To run Artista project you should follow these steps:

1- First step:
To use the Web API, start by creating a Spotify user account (Premium or Free). To do that, simply sign up at www.spotify.com.

When you have a user account, go to the Dashboard page at the Spotify Developer website and, if necessary, log in. Accept the latest Developer Terms of Service to complete your account set up. 

Create your own project on Spotify to get you a client_ID, and client_Secret.

Make sure to set a correct Redirect URI, example: http://localhost:3000 (as I used in this project)

2- Second Step:
Enter to the /src/config_example.js
and setup your client_Id, client_Secret and redirect URI
export const clientId = "your_client_Id";
export const clientSecret = "your_client_Secret";
export const redirectUri = "http://localhost:3000";//this needs to be the same as the one that you set in spotify application.

3- Thirst Step: In the project directory run : `npm install` to install all dependencies

4- Fourth Step: In the project directory run : `npm start` to install all dependencies
