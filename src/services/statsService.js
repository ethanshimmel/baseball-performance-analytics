function calculateAVG(hits, atBats) {
    return atBats === 0 ? 0 : hits / atBats;
}

function calculateOBP(hits, walks, hitByPitch, atBats, sacrificeFlies) {
    const denominator = atBats + walks + hitByPitch + sacrificeFlies;

    return denominator === 0
        ? 0
        : (hits + walks + hitByPitch) / denominator;
}

function calculateTotalBases(hits, doubles, triples, homeRuns) {
    const singles = hits - doubles - triples - homeRuns;

    return singles + (2 * doubles) + (3 * triples) + (4 * homeRuns);
}

function calculateSLG(hits, doubles, triples, homeRuns, atBats) {
    if (atBats === 0) return 0;

    return calculateTotalBases(
        hits, doubles, triples, homeRuns
    ) / atBats;
}

function calculateOPS(obp, slg) {
    return obp + slg;
}

function calculateSeasonStats(games) {
    const totals = games.reduce((result, game) => {
        result.atBats += game.at_bats;
        result.hits += game.hits;
        result.doubles += game.doubles;
        result.triples += game.triples;
        result.homeRuns += game.home_runs;
        result.walks += game.walks;
        result.hitByPitch += game.hit_by_pitch;
        result.sacrificeFlies += game.sacrifice_flies;
        result.strikeouts += game.strikeouts;
        result.stolenBases += game.stolen_bases;

        return result;
    }, {
        atBats: 0,
        hits: 0,
        doubles: 0,
        triples: 0,
        homeRuns: 0,
        walks: 0,
        hitByPitch: 0,
        sacrificeFlies: 0,
        strikeouts: 0,
        stolenBases: 0
    });

    const avg = calculateAVG(totals.hits, totals.atBats);

    const obp = calculateOBP(
        totals.hits,
        totals.walks,
        totals.hitByPitch,
        totals.atBats,
        totals.sacrificeFlies
    );

    const slg = calculateSLG(
        totals.hits,
        totals.doubles,
        totals.triples,
        totals.homeRuns,
        totals.atBats
    );

    return {
        ...totals,
        avg,
        obp,
        slg,
        ops: calculateOPS(obp, slg)
    };
}

module.exports = {
    calculateAVG,
    calculateOBP,
    calculateTotalBases,
    calculateSLG,
    calculateOPS,
    calculateSeasonStats
};