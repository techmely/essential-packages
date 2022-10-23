import { describe, expect, test } from "vitest";
import { isNumber } from "../src/is";
import { formatPrice, formatNumber, formatLot10Volume } from "../src/number";

const dataTestFormatNumber = [
	[123123, 0, "-", "123,123"],
	[9999, 1, "-", "9,999.0"],
	[9999, 2, "+", "9,999.00"],
	[undefined, 0, "*", "*"],
];
const dataTestFormatPrice = [
	[123123, 0, "(", "123,123"],
	[3344555, 0, ")", "3,344,555"],
	[66778899, 2, "2", "66,778,899.00"],
	[undefined, 2, "Và như thế tôi sống vui từng ngày"],
];
const dataTestFormat10Volume = [
	[123123, 0, "-", "1,231,23"],
	[232323, 1, "-", "2,323,230."],
	[69696969, 2, "+", "696,969,690.0"],
	[undefined, 2, "*"],
];

describe("Format number to desire form", () => {
	test.each(dataTestFormatNumber)(
		"When input is %d, precision %d, fallbackValue %s, should return %s ",
		(input, precision, fallbackValue, expected) => {
			if (input && isNumber(precision)) {
				expect(formatNumber(input, precision, fallbackValue)).toBe(expected);
			} else {
				expect(formatNumber(input, precision ? +precision : 0, fallbackValue)).toBe(fallbackValue);
			}
		},
	);

	test.each(dataTestFormatPrice)(
		"Should return %s when input is %d, %d, %s, %s",
		(input, precision, fallbackValue, expected) => {
			if (input && isNumber(precision)) {
				expect(formatPrice(input, precision, fallbackValue)).toBe(expected);
			} else {
				expect(formatPrice(input, precision ? +precision : 0, fallbackValue)).toBe(fallbackValue);
			}
		},
	);

	test.each(dataTestFormat10Volume)(
		"Should return %s when input is %d, %d, %s, %s",
		(input, precision, fallbackValue, expected) => {
			if (input && isNumber(precision)) {
				expect(formatLot10Volume(input, precision, fallbackValue)).toBe(expected);
			} else {
				expect(formatLot10Volume(input, precision ? +precision : 0, fallbackValue)).toBe(
					fallbackValue,
				);
			}
		},
	);
});
