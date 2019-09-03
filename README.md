# Tune coding challenge

Uses create-react-app with typescript for speedy development and avoiding overhead of webpack configuration.


### Starting server
This assumes that you have Yarn installed <https://yarnpkg.com/en/>

Once installed, run it in the root directory to install dependencies:

`yarn`

Then start the node server, by running:
`yarn server`

Finally, start the react development server:
`yarn start`

This will automatically open a tab in your browser pointed to localhost:3000


## Notes/Assumptions

__Important!__
Tests were not finished due to time constraints. I spent a bit of extra time on some other things. There was only one test file created and that was for the app.jsx file. I put this test in here for good faith for my interest in testing. To run the single lonesome test run `yarn test`. An error does remain on that test, and that is because I could not isolate the component using shallow mount because the "useEffect" of react hooks (see below) is not yet supported in shallow, therfore forcing the usage of mount (for now) and causing some errors down the line. However, the tests pass.

Also important to note is that the structure utilizes Reacts new "hooks", which replaces the usage of classes and reduces complexity of lifecycle methods. See more at <https://reactjs.org/docs/hooks-intro.html> So this could be considered an assumption of some degree of familiarity of the latest React patterns.

Also important is that I created a node/express server for this project. It seemed to me that a 7500 KB file sent across the wire was a bit large and warranted a separation of concerns, at least in demonstration of my thinking anyway (since the file would not get any larger). I didnt setup a DB to save time for both me and the installer on your end. It also does the heavy lifting with the data, since that made sense anyway for the consumption of mapped data on the front end.

Other extras: Pagination, sorting, and ordering (ascending, descending)

#### Dev dependency notes
I personally like to use Prettier to reduce the arguments about code style. You can learn more here: <prettier.io>

I also used a charting library that I hand't used before because it seemed quick and easy. And it was :)


