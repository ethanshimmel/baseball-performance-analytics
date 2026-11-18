jest.mock("../src/repositories/gameRepository", () => ({
    createGame: jest.fn()
}));

const gameService = require("../src/services/gameService");
const gameRepository = require("../src/repositories/gameRepository");

describe("Game Statistics Validation", () => {
    const validStats = {
        atBats: 4,
        hits: 2,
        doubles: 1,
        triples: 0,
        homeRuns: 0,
        walks: 1,
        hitByPitch: 0,
        sacrificeFlies: 0,
        strikeouts: 1,
        stolenBases: 0
    };

    test("accepts valid statistics", () => {
        gameService.validateStats(validStats);
    });

    test("rejects negative statistics", () => {
        expect(() => gameService.validateStats({
            ...validStats,
            hits: -1
        })).toThrow();
    });

    test("rejects more hits than at-bats", () => {
        expect(() => gameService.validateStats({
            ...validStats,
            hits: 5
        })).toThrow();
    });

    test("rejects more extra-base hits than total hits", () => {
        expect(() => gameService.validateStats({
            ...validStats,
            doubles: 2,
            triples: 1
        })).toThrow();
    });
});