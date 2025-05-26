import Settings from "../config";

register("chat", (name) => {
	if (!Settings.pjoin) return;
	name = name.replace(/\[[\w+\+-]+] /, "").trim();
	ChatLib.command("p " + name);
}).setCriteria("From ${name}: settings");