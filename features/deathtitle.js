import Settings from "../config";
import { getDclass } from "../utils.js";

let disc = [];

register("chat", (info) => {
	if (!Settings.deathtitle) return;
	let ign = info.match(/\w+/)[0];
	if (ign == "You") return;
	if (info.includes("disconnected")) {
		disc.push(ign)
		setTimeout(() => {
			disc.splice(disc.indexOf(ign), 1);
		}, 1000)
	}
	let dclass = getDclass(ign);
	if (!dclass) return;

	Client.showTitle("", "", 0, 1, 0);
	setTimeout(() => { Client.showTitle("&c☠ " + dclass + " ☠", ign, 0, 25, 5); }, 1);
}).setCriteria(" ☠ ${info} and became a ghost.");

register("chat", (info) => {
	if (!Settings.dtrevtitle) return;
	let ign = info;
	let dclass = getDclass(ign);
	if (!dclass) return;

	setTimeout(() => {
		if (disc.includes(ign)) return;
		Client.showTitle("", "", 0, 1, 0);
		Client.showTitle("§a4 " + dclass + " §a4", ign, 0, 10, 5);
		setTimeout(() => { Client.showTitle("§a3 " + dclass + " §a3", ign, 0, 10, 5); }, 1000);
		setTimeout(() => { Client.showTitle("§a2 " + dclass + " §a2", ign, 0, 10, 5); }, 2000);
		setTimeout(() => { Client.showTitle("§a1 " + dclass + " §a1", ign, 0, 10, 5); }, 3000);
		setTimeout(() => { Client.showTitle("§a❣ " + dclass + " §a❣", ign, 0, 15, 5); }, 4000);
	}, 1000)
}).setCriteria(" ❣ You are reviving ${info}!");