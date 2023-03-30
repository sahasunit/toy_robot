const tableX = 5; // width of table
const tableY = 5; // height of table

/**
 * @function getDirection - Gets the index of the rotation from directions store
 * @param directionStore - Has the directions the robot can move
 * @param rotateToken
 */
export const getDirection = (directionStore, rotateToken) => {
	return directionStore.indexOf(rotateToken);
};

/**
 * @function checkAxisLimit - Used to determine the validitiy of value passed with the limits of the board
 */
export const checkAxisLimit = (minAxisLimit, maxAxisLimit) => {
	return (value) => value >= minAxisLimit && value < maxAxisLimit;
};

/**
 * @function tokenizeCommands - used to seperate the commands and create an array of commands to be taken as incrementing steps
 * @param commandArray - eg. ["PLACE 0,0,NORTH","MOVE","LEFT","REPORT"]
 */
export const tokenizeCommands = (commandArray) => {
	let initialCommandSplit = [];
	let commandTokens = [];

	for (let i = 0; i <= commandArray.length - 1; i++) {
		initialCommandSplit = commandArray[i].toUpperCase().split(" "); // Initial split and converting all commands to uppercase
		if (initialCommandSplit.length === 2) {
			initialCommandSplit[1] = initialCommandSplit[1].split(",");
		} else {
			initialCommandSplit[1] = []; //default to empty array
		}
		commandTokens.push(initialCommandSplit);
	}
	return commandTokens;
};

/**
 * @function invalidCommand - Raise warning on console if something goes wrong
 */
export const invalidCommand = (commandStep) => {
	console.log("!! INVALID COMMAND STEP: " + commandStep + " - IGNORED !!");
};

export const checkLimitX = checkAxisLimit(0, tableX);
export const checkLimitY = checkAxisLimit(0, tableY);

/**
 * @function validatePlaceParams - used to validate the parameters for placing the toy robot
 */
export const validatePlaceParams = (directionStore, placeParams) => {
	const positionX = +placeParams[0];
	const positionY = +placeParams[1];
	const getDirectionChange = getDirection(directionStore, placeParams[2]);
	if (
		checkLimitX(positionX) &&
		checkLimitY(positionY) &&
		getDirectionChange > -1
	) {
		return [positionX, positionY, getDirectionChange];
	} else {
		return -1;
	}
};

/**
 * @function displayWelcomeScreen - Welcome Screen to show the program has started and the commands being run
 */
export const displayWelcomeScreen = (commandArray) => {
	console.log("\nWelcome to Toy Robot Challenge!");
	console.log("The following commands are: [" + commandArray + "]");
};
