# toy_robot

The language used is Javascript to create the Toy Robot program.

--------------------------------------------------------------------------------------

To start the program, ensure/install the packages listed below in the system.

- "npm install"
- "npm install --save-dev jest"
- Python3 installed

To run the program with a python script, on termninal:
type: ./runToyRobot.py

It will fire off the program and multiple test data will run displaying the result on terminal

To run your own test data, do the following:

- Create a txt file of array input in command_input folder 
- On the terminal type: node toyRobot.js 'command_file/{yourFileName}.txt'
- Observe the result

To test the helper function of the program on terminal using Jest case:
type: node --experimental-vm-modules node_modules/.bin/jest

The program will describe each test and will show all test cases passed
including when incorrect input was passed through
