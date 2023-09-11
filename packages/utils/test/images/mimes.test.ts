import { describe, expect, it } from "vitest";
import { getMimeTypeFromExtension } from "../../src/file";

describe("getMimeTypeFromExtension", () => {
  it("returns a mime type when passing an extension", () => {
    expect(getMimeTypeFromExtension("gif")).toBe("image/gif");
    expect(getMimeTypeFromExtension("png")).toBe("image/png");
    expect(getMimeTypeFromExtension("mov")).toBe("video/quicktime");
    expect(getMimeTypeFromExtension("jpg")).toBe("image/jpeg");
  });

  it("throws an error when passing an invalid extension", () => {
    // @ts-expect-error Check enum errors
    expect(() => getMimeTypeFromExtension("gifs")).toThrow("'gifs' is not a valid extension");
  });
});
