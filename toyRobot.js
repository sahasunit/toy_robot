import {
	tokenizeCommands,
	invalidCommand,
	checkLimitX,
	checkLimitY,
	validatePlaceParams,
	displayWelcomeScreen,
} from "./toyRobotHelper.js";
import fs from "fs";

const directionStore = ["NORTH", "EAST", "SOUTH", "WEST"]; // Directions store

/**
 * @function readRobotCommands - reads the input command file and starts the main process
 */
const readRobotCommands = () => {
	const filePath = process.argv;
	fs.readFile(filePath[2], "utf8", (err, data) => {
		if (err) {
			console.error({ err });
			return;
		}
		let robotCommand = JSON.parse(data);
		toyRobot(robotCommand);
	});
};

/**
 * @function toyRobot - Main program that Places, Moves, Rotates & Reports toy robot position depending on the commands
 * @param commandArray - eg. ["PLACE 0,0,NORTH","MOVE","LEFT","REPORT"]
 */
const toyRobot = (commandArray) => {
	let robotPositionX = 0; //default position of robot on x-axis
	let robotPositionY = 0; //default position of toy robot on y-axis
	let currentRobotDirection = 0; // Default position of the robot
	let isRobotPlaced = false; // Determines if the robot is placed on the board
	const commandTokens = tokenizeCommands(commandArray); //tokenized commands

	//Log the posiion of the robot in this manner: x-pos,y-pos,current-robot-direction
	const reportRobotPosition = () => {
		console.log(
			"Reporting: " +
				[
					robotPositionX,
					robotPositionY,
					directionStore[currentRobotDirection],
				].join(",")
		);
	};

	/**
	 * @function placeRobot - Validates the Place postion of robot on board and places the robot if validation checks out
	 * @param initialPlaceCommand - eg.["0","0","NORTH"]
	 */
	const placeRobot = (initialPlaceCommand) => {
		const validatedCommands = validatePlaceParams(
			directionStore,
			initialPlaceCommand || directionStore,
			[]
		);
		if (validatedCommands.length === 3) {
			[
				robotPositionX,
				robotPositionY,
				currentRobotDirection,
			] = validatedCommands;
			isRobotPlaced = true; //Robot placed
		} else {
			console.log(
				"!! Toy robot couldn't be placed. The params for placing were out of limits !!"
			);
		}
	};

	/**
	 * @function moveRobot - Moves the robot and increments/decrements steps taken by the robot to keep track
	 */
	const moveRobot = () => {
		//if EAST or WEST
		if (currentRobotDirection % 2 === 1) {
			if (currentRobotDirection === 1) {
				robotPositionX++; //EAST - Moves infront
			} else {
				robotPositionX--; //WEST - Moves behind
			}
		}
		//if NORTH or SOUTH
		else {
			if (currentRobotDirection === 0) {
				robotPositionY++; //NORTH - Moves infront
			} else {
				robotPositionY--; //SOUTH - Moves behind
			}
		}
	};

	/**
	 * @function rotateRobot - Rotates the robot and saves the new facing position
	 * @param rotateToken - eg. "LEFT" or "RIGHT"
	 */
	const rotateRobot = (rotateToken) => {
		const newDirection =
			(currentRobotDirection + (rotateToken === "LEFT" ? 3 : 1)) % 4; //modulo is done to match the number with directionStore index and store the direction
		currentRobotDirection = newDirection;
	};

	//Checks if the robot can move from it's current position
	const canMove = (currentRobotDirection) => {
		switch (currentRobotDirection) {
			//North
			case 0:
				return checkLimitY(robotPositionY + 1); //Checks the next move with the limt of y-axis
			//East
			case 1:
				return checkLimitX(robotPositionX + 1); //Checks the next move with the limt of x-axis
			//South
			case 2:
				return checkLimitY(robotPositionY - 1);
			//West
			case 3:
				return checkLimitX(robotPositionX - 1);
		}
	};

	//Display welcome message
	displayWelcomeScreen(commandArray);

	//Step through the command tokens
	commandTokens.forEach((command) => {
		switch (command[0]) {
			case "PLACE":
				placeRobot(command[1]);
				break;
			case "LEFT":
			case "RIGHT":
				isRobotPlaced ? rotateRobot(command[0]) : invalidCommand(command[0]);
				break;
			case "MOVE":
				isRobotPlaced && canMove(currentRobotDirection)
					? moveRobot()
					: invalidCommand(command[0]);
				break;
			case "REPORT":
				isRobotPlaced ? reportRobotPosition() : invalidCommand(command[0]);
				break;
			default:
				invalidCommand(command[0]);
				break;
		}
	});
};

readRobotCommands();
