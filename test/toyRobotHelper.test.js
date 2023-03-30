import {
	getDirection,
	tokenizeCommands,
	validatePlaceParams,
	checkLimitX,
	checkLimitY,
} from "../toyRobotHelper.js";
import { expect } from "@jest/globals";

describe("Testing Toy Robot Helper functions", () => {
	test("getDirection should return the direction index from the defined store", () => {
		const directionStore = ["NORTH", "EAST", "SOUTH", "WEST"]; // Directions store
		const directionIndex = 2;
		expect(getDirection(directionStore, "SOUTH")).toEqual(directionIndex);
	});

	test("checkLimitX should return a false to indicate there is no space in x-axis to move", () => {
		expect(checkLimitX(-1)).toEqual(false);
	});

	test("checkLimitX should return a false to indicate there is no space in x-axis to move", () => {
		expect(checkLimitX(5)).toEqual(false);
	});

	test("checkLimitX should return a true to indicate there is space in x-axis to move", () => {
		expect(checkLimitX(2)).toEqual(true);
	});

	test("checkLimitY should return a false to indicate there is no space in y-axis to move", () => {
		expect(checkLimitY(-2)).toEqual(false);
	});

	test("checkLimitY should return a false to indicate there is no space in y-axis to move", () => {
		expect(checkLimitY(7)).toEqual(false);
	});

	test("checkLimitY should return a true to indicate there is space in y-axis to move", () => {
		expect(checkLimitY(3)).toEqual(true);
	});

	test("tokenizeCommands should return an array of split commands", () => {
		const tokenisedCommands = [
			["PLACE", ["0", "1", "NORTH"]],
			["MOVE", []],
			["RIGHT", []],
			["MOVE", []],
			["REPORT", []],
		];
		const command = ["Place 0,1,North", "Move", "right", "move", "REPort"];
		expect(tokenizeCommands(command)).toEqual(tokenisedCommands);
	});

	test("Test 1 - validatePlaceParams should return an array of [x-axis-pos,y-axis-pos,robot-direction-change]", () => {
		const directionStore = ["NORTH", "EAST", "SOUTH", "WEST"]; // Directions store
		const placeCommand = ["0", "1", "NORTH"];
		const resultPlaceCommand = [0, 1, 0];
		expect(validatePlaceParams(directionStore, placeCommand)).toEqual(
			resultPlaceCommand
		);
	});
	test("Test 2 - validatePlaceParams should return -1 because x-axis-pos:5 is above table limit", () => {
		const directionStore = ["NORTH", "EAST", "SOUTH", "WEST"]; // Directions store
		const placeCommand = ["5", "1", "WEST"];
		const resultPlaceCommand = -1;
		expect(validatePlaceParams(directionStore, placeCommand)).toEqual(
			resultPlaceCommand
		);
	});
});
