# Code Sample NWEA

Copyright (c) 2016 Lisa Gray

This application was made to play the card game war as a code sample.

It is unfinished compared to my original vision, ran out of time due to previous commitments.

#Known Bug
 if a war happens and one person runs out of cards it throws an error and stops the game.

Future tasks:
  -break up Game component into multiple components (Player, Field)
  -use spritesheet and canvas to render a deck/hand and each card
  -rather than automatically playing the game, have a play turn button and animate card flips
  -extract out game class to handle all the game logic and add testing
  -create components and use canvas to draw and update field


# Installation and running

1. Run `npm install`
2. Run `gulp`
3. point browser to `http://localhost:3000/


# Running tests only

Run `gulp test` for single run or `gulp wtest` for multiple based on modification to files