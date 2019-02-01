This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements:

**You’ll need to have Node 8.10.0 or later on your local development machine**

### Considerations

- I tried to separate some of the concerns, such as displaying the results, pagination, and making the request to the API itself.
- Also, I've added debounce to the API requests, so that it "buffers" keystrokes before making an actual request. This way you don't make a request on every keystroke, and also prevents the screen from flashing, providing a better user experience
- I've added very little comments in the code, since I believe that the tests should suffice as documentation

### TODO

- More unit tests
- Acceptance (webdriver/selenium) tests
- Contract tests
- JsLint

## Available Scripts

In the project directory, you can run:

### `npm start` - ( You may need to run `npm install` first)
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.