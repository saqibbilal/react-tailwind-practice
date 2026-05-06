React Challenge

Note: there is no automated grading, the Run button should do nothing. Complete your submission and submit, where it'll be graded by our team.

We are going to build a variation of the game Wordle. Read the instructions closely, as the game logic you're implementing is simplified from the real game!

In this game there's a secret word and the player has 5 opportunities to guess what that secret word is. Both the secret word and the player's word are 5 characters long. Each time the player takes a guess, their word gets appended to a word list on screen. The word list is shown as a 5x5 grid with empty cells in place of guesses that haven't been used yet, and one character in each word per cell. Below the 5x5 grid is a single input for the user to type their guess.

For each character in a guessed word, the game highlights the cell's background. If the character isn't in the secret word, we color it red. If the character is in the secret word, but at a different position, we color it yellow. If the character is both in the secret word and at the same position, we color it green.

For example, if the secret word is "SLOPE", and the user guesses "RAMPY", then the "P" would be colored green, and others in red. A guess like "SLEEP" would color "S" and "L" in green, both "E"s and "P" in yellow, and nothing in red.

When the player guesses the secret word, the game ends with a "You've won!" message.
When the player runs out guesses, the game ends with a "You've lost!" message.

The secret word is SPEND

Additional info:

No styling required besides the background color for guesses
You do not need to check whether guesses are real words
Use React APIs only. Don't use external libraries
Running the app
The following commands will be executed automatically when you open the question.

npm install
npm start
NOTE: Make sure to click the refresh icon after running the application to see the preview.
If you open the problem and receive type errors, try refreshing.

[execution time limit] 30 seconds

[memory limit] 4g