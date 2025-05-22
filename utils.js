import { updateDisplays } from './displaymanager/displaymanager'

////////////////////////////////////////// Initializing consts

const mappedclasses = {
	"A": "Archer",
	"B": "Berserker",
	"H": "Healer",
	"M": "Mage",
	"T": "Tank",
}


////////////////////////////////////////// Prefix for all the chat msg from SM

export function prefix(feature = "none") {
	if (feature === "none")
		return "&b[&6SM&b]&f: ";
	else
		return `&b[&6SM&b] &d${feature}&f: `;
}


////////////////////////////////////////// Set dungeon vars (players, classes, floor)

let indun = "";
let players = {};
initDungeon();
export const getDungeon = () => indun;

export function getDclass(ign) {
	if (!players[ign]) {
		logScoreboardAndPlayers();
	}
	return players[ign];
}

function initDungeon() {
	indun = "";
	players = {};

	Scoreboard.getLines().forEach((l) => {
		let dunmatch = ChatLib.removeFormatting(l).match(/The Catac..ombs \((M[1-7]|F[1-7])\)/);
		if (dunmatch) {
			indun = dunmatch[1];
			updateDisplays();
		}

		let playermatch = ChatLib.removeFormatting(l).match(/\[(M|A|B|T|H)\] (\S*) .?.?(\[Lv\d{1,2}\]|DEAD|[\d,]+❤)/);
		if (playermatch) {
			players[playermatch[2].replace(/[^\w_]+/, "")] = playermatch[1].replace(/A|B|H|M|T/g, c => mappedclasses[c]);
		}
	})
}


////////////////////////////////////////// Set dungeon vars (players, classes, floor)

let p3 = false;
export const getp3 = () => p3;

register("chat", () => {
	p3 = true;
	updateDisplays();
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");

register("chat", () => {
	p3 = false;
	updateDisplays();
}).setCriteria("The Core entrance is opening!");


////////////////////////////////////////// Trigger

register("worldLoad", () => {
	setTimeout(() => {
		initDungeon();
	}, 1000);
	setTimeout(() => {
		if (!indun)
			initDungeon();
	}, 5000);
})

register("chat", () => {
	if (!indun)
		initDungeon();
}).setCriteria(/Starting in [4,1] seconds?./)


////////////////////////////////////////// gfs queue

const gfsqueue = [];
let isexec = false;
export function rungfs(param) {
	gfsqueue.push(param)
	execgfs();
}
function execgfs() {
	if (isexec || gfsqueue.length === 0)
		return;
	isexec = true;
	const nextparam = gfsqueue.shift();
	ChatLib.command(`gfs ${nextparam}`)

	setTimeout(() => {
		isexec = false;
		execgfs();
	}, 2000);
}


////////////////////////////////////////// resetting vars

register("worldUnload", () => {
	p3 = false;
	indun = "";
	players = {};
	updateDisplays();
})


////////////////////////////////////////// debugging

// register("command", () => {
// logScoreboardAndPlayers();
// }).setName("smlogdungeon");

function logScoreboardAndPlayers() {
	console.log("=========================")
	console.log("Player not found printing Scoreboard...")
	Scoreboard.getLines().forEach(l => console.log(ChatLib.removeFormatting(l)));
	console.log("-------------------------")
	for (e in players) {
		console.log(e + " : " + players[e]);
	}
	console.log("=========================")
}
