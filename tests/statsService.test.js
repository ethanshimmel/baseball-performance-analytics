const stats = require("../src/services/statsService");

describe("Batting Statistics", () => {
    test("calculates batting average", () => {
        expect(stats.calculateAVG(10, 30)).toBeCloseTo(0.3333);
    });

    test("returns zero when at-bats are zero", () => {
        expect(stats.calculateAVG(0, 0)).toBe(0);
    });

    test("calculates on-base percentage", () => {
        expect(stats.calculateOBP(10, 5, 1, 30, 2))
            .toBeCloseTo(16 / 38);
    });

    test("calculates total bases", () => {
        expect(stats.calculateTotalBases(10, 2, 1, 1)).toBe(17);
    });

    test("calculates slugging percentage", () => {
        expect(stats.calculateSLG(10, 2, 1, 1, 30))
            .toBeCloseTo(17 / 30);
    });

    test("calculates OPS", () => {
        expect(stats.calculateOPS(0.400, 0.500)).toBeCloseTo(0.900);
    });
});