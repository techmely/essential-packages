import { NullList, UnDef } from "@techmely/types";

import { isNumber } from "../is";

/**
 *
 * @param num
 * @param precision
 * @param defaultValue
 * @returns
 */
export function formatNumber(
	num: NullList<number>,
	precision = 0,
	defaultValue: UnDef<number | string> = "-",
) {
	if (!isNumber(num)) {
		return defaultValue;
	}
	return num.toLocaleString("en", {
		minimumFractionDigits: precision,
		maximumFractionDigits: precision,
	});
}

/**
 *
 * @param price
 * @param precision
 * @returns
 */
export function formatPrice(price: NullList<number>, precision = 0) {
	return formatNumber(price, precision);
}

/**
 *
 * @param volume
 * @param precision
 * @param defaultValue
 * @returns
 */
export function formatLot10Volume(
	volume: NullList<number>,
	precision = 0,
	defaultValue: UnDef<number | string> = "-",
) {
	if (!isNumber(volume)) {
		return defaultValue;
	}
	return (volume * 10)?.toLocaleString("en", { minimumFractionDigits: precision }).slice(0, -1);
}
