
# Guessr

Welcome to Guessr, the web app designed to make learning about API integration fun and interactive! Guessr is a game that challenges you to guess which of two randomly fetched artists has a higher follower count on their respective platforms. It's not only an entertaining way to test your knowledge of popular artists but also a fantastic way to understand how to integrate APIs into web applications.

## How It Works:

### Random Artist Selection:
- When you start the game, Guessr makes API calls to fetch data about two random artists. This data includes their names and an image of each artist.

### Make Your Guess:
- You are presented with the names of the two artists. Your task is to guess which artist has a higher follower count by selecting either one of the artists.
  
### Feedback and Learning:
- After making your guess, Guessr will reveal whether your guess was correct.

### Continuous Play:
Continue playing to see more artist comparisons, learn more about different APIs, and improve your guessing skills. Each round provides a new pair of artists, ensuring endless fun and learning opportunities.

## Why Guessr?
Guessr is perfect for anyone looking to get hands-on experience with API integration in web development. By the end of your play session, you'll not only have had fun but also gained valuable insights into how APIs work and how they can be integrated into web applications.


Ready to test your knowledge and learn about API integration? Dive into Guessr and start guessing today!

## How To Run

Clone the git:
```bash
  git clone "https://github.com/SamsonOlajide/Guessr.git"
```

Import all dependencies:
```bash
  npm i
```

create a **.env** file amonst the cloned folder:
```bash
  touch .env
```

Make sure to include the following information in the **.env** file (The following information can be obtained from the [Spotify API](https://developer.spotify.com/documentation/web-api)):

```
    CLIENT_ID
    CLIENT_SECRET
    ACCESS_TOKEN
```

To run the information(if you use nodemon, replace the **node** with **nodemon** below):
```
    node index.js
```
After running the javascript, this information will be logged into the terminal:

```
    Server started on port 3000
```

In order to view the web page, Copy the following link:
```
    http://localhost:3000/
```

## Web Apperance
**Desktop View:**
![alt text](/public/Images/image-1.png)
**Mobile Phone View:**
![alt text](/public/Images/image.png)