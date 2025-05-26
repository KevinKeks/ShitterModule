const mappedclasses = {
	"A": "Archer",
	"B": "Berserker",
	"H": "Healer",
	"M": "Mage",
	"T": "Tank",
}

export function prefix(feature) {
	return "&b[&6SM&b]" + (feature ? ` &d${feature}` : "") + "&f: ";
}

export let indun;
let players = {};
export function getDclass(ign) {
	return players[ign];
}
register("worldLoad", () => {
	setTimeout(() => {
		if (indun) return;
		initDungeon();
	}, 5000);
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

export let p3 = false;
register("chat", () => {
	p3 = true;
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");
register("chat", () => {
	p3 = false;
}).setCriteria("The Core entrance is opening!");

const gfsqueue = [];
let isexec = false;
export function rungfs(param) {
	gfsqueue.push(param)
	execgfs();
}
function execgfs() {
	if (isexec || gfsqueue.length === 0) return;
	isexec = true;
	const nextparam = gfsqueue.shift();
	ChatLib.command(`gfs ${nextparam}`)
	setTimeout(() => {
		isexec = false;
		execgfs();
	}, 2000);
}

register("worldUnload", () => {
	p3 = false;
	indun = "";
	players = {};
	gfsqueue.length = 0;
})