import Settings from "../config";
import prefix from "../utils/prefix";
import { getdun } from "../utils/dungeons";


let downtime = false;

const reg1 = register("chat", () => {
	if (downtime) return;
	setTimeout(() => {
		ChatLib.command("joininstance MASTER_CATACOMBS_FLOOR_FIVE");
	}, Settings.m5rqdelay);
}).setCriteria("[BOSS] ${*} Livid: My shadows are everywhere, THEY WILL FIND YOU!!").unregister();

const reg2 = register("chat", (ign, reason) => {
	if (downtime || !getdun().match(/M5|F5/)) return;
	downtime = true;
	ign = ign.replace(/\[[\w+\+-]+] /, "");
	setTimeout(() => {
		ChatLib.chat(new Message(prefix("M5rq") + `Requeue &cdisabled &ffor this run -> ${ign} requested downtime`, (reason ? ` (${reason})` : ""), " ",
			new TextComponent("&7[&4x&7]").setClick("run_command", "/m5rqdeletedowntime").setHoverValue("&eRemove dt")));
	}, 10);
}).setCriteria(/Party > (.*): !dt ?(.*)/).unregister();

const reg3 = register("command", () => {
	if (!downtime) return;
	downtime = false;
	ChatLib.chat(prefix("M5rq") + "Downtime removed");
}).setName("m5rqdeletedowntime").unregister();

const reg4 = register("worldUnload", () => {
	downtime = false;
}).unregister();

const reg5 = register("command", () => togglem5rq()).setName("m5rq").unregister();
const m5rqkeybind = new KeyBind("M5rq", Keyboard.KEY_NONE, "ShitterModule");
const reg6 = m5rqkeybind.registerKeyPress(() => togglem5rq()).unregister();
const togglem5rq = () => {
	Settings.m5rq = !Settings.m5rq;
	ChatLib.chat(prefix("M5rq") + (Settings.m5rq ? "enabled" : "disabled"))
	m5rq.update();
}


const m5rq = {
	update() {
		if (Settings.maintoggle && Settings.m5rq) {
			reg1.register(); reg2.register(); reg3.register(); reg4.register(); reg5.register(); reg6.register();
		}
		else if (Settings.maintoggle) {
			reg1.unregister(); reg2.unregister(); reg3.unregister(); reg4.unregister();
			reg5.register(); reg6.register();
		}
		else {
			reg1.unregister(); reg2.unregister(); reg3.unregister(); reg4.unregister(); reg5.unregister(); reg6.unregister();
		}
	}
}

export default m5rq;
