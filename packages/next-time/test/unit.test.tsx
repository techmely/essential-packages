import React from "react";
import { test, expect } from "vitest";
import { NextTime } from "../src/NextTime";
import { render, screen } from "@testing-library/react";

test("loads and displays greeting", async () => {
	render(
		<NextTime
			datetime="2023-02-12T18:26:41.058Z"
			locale="vi-VN"
			month="long"
			day="numeric"
			second="numeric"
		/>,
	);

	expect(screen.getByRole("time")).toHaveTextContent("hello there");
});
