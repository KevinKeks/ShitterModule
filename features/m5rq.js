import Settings from "../config";
import { getDungeon, prefix } from "../utils";


let downtime = false;

register("chat", () => {
	if (!Settings.m5rq || downtime) return;
	setTimeout(() => {
		ChatLib.command("joininstance MASTER_CATACOMBS_FLOOR_FIVE");
	}, Settings.m5rqdelay);
}).setCriteria("[BOSS] ${*} Livid: My shadows are everywhere, THEY WILL FIND YOU!!");


register("chat", (ign, reason) => {
	if (downtime || !Settings.m5rq || !getDungeon().match(/M5|F5/)) return;
	downtime = true;
	ign = ign.replace(/\[[\w+\+-]+] /, "");
	setTimeout(() => {
		ChatLib.chat(new Message(prefix("M5rq") + `Requeue &cdisabled &ffor this run -> ${ign} requested downtime`, (reason ? ` (${reason})` : ""), " ",
			new TextComponent("&7[&4x&7]").setClick("run_command", "/m5rqdeletedowntime").setHoverValue("&eRemove dt")));
	}, 10);
}).setCriteria(/Party > (.*): !dt ?(.*)/);

register("command", () => {
	if (!downtime) return;
	downtime = false;
	ChatLib.chat(prefix("M5rq") + "Downtime removed");
}).setName("m5rqdeletedowntime");

register("worldUnload", () => {
	downtime = false;
})