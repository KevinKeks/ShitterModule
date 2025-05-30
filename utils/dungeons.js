const mappedclasses = {
    "A": "Archer",
    "B": "Berserker",
    "H": "Healer",
    "M": "Mage",
    "T": "Tank",
}

let indun;
let players = {};
const getdun = () => indun;
const getDclass = ign => {
    return players[ign];
}

register("worldLoad", () => {
    setTimeout(() => { if (indun) return; initDungeon(); }, 1000);
    setTimeout(() => { if (indun) return; initDungeon(); }, 5000);
})
register("chat", () => {
    if (indun) return
    initDungeon();
}).setCriteria(/Starting in [4,1] seconds?./)

function initDungeon() {
    indun = undefined;
    players = {};
    Scoreboard.getLines().forEach((l) => {
        let dunmatch = ChatLib.removeFormatting(l).match(/The Catac..ombs \((M[1-7]|F[1-7])\)/);
        if (dunmatch)
            indun = dunmatch[1];
        let playermatch = ChatLib.removeFormatting(l).match(/\[(M|A|B|T|H)\] (\S*) .?.?(\[Lv\d{1,2}\]|DEAD|[\d,]+❤)/);
        if (playermatch)
            players[playermatch[2].replace(/[^\w_]+/, "")] = playermatch[1].replace(/A|B|H|M|T/g, c => mappedclasses[c]);
    })
}

let p3 = false;
const getp3 = () => p3;
register("chat", () => {
    p3 = true;
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");
register("chat", () => {
    p3 = false;
}).setCriteria("The Core entrance is opening!");

register("worldUnload", () => {
    p3 = false;
    indun = undefined;
    players = {};
})

export { getdun, getDclass, getp3 };