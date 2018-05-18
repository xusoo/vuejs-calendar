# Vue.js Calendar

Project based on [this course](http://bit.ly/2mPK8ny) and then added some improvements and new features on top of it.

Steps for starting the application after cloning the repository:

#### Install dependencies

```
npm install
```

#### Start MongoDB

Easiest way:
```
docker run -d -p 27017:27017 -v /data/db mongo
```

Or if the instance is running in another machine or another port, you can change the property `MONGODB_URL` in the `.env` file.

#### Run the app

```
npm run start
```

The app will be available at *localhost:[PORT]* where `PORT` is whatever value is set in your `.env` file.

For production build set `NODE_ENV=production` in `.env` and execute `npm run build` before running `npm run start`.

#### Screenshots 
![Screenshot](https://i.imgur.com/g9Srjz7.png)