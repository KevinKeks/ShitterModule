import Settings from "./config";
import { prefix } from "./utils"
import "./features/betterbeam";
import "./features/deathtitle";
import "./features/ghostpick";
import "./features/m5rq";
import "./features/miningability";
import "./features/pjoin";
import "./features/invprocs";
import "./features/refills";
import "./features/sceptrepearl";
import "./features/helmetdisplay";

const firstloadreg = register("worldLoad", () => {
	if (Settings.firstload) {
		ChatLib.chat(new Message("&0--------------------------------------------------\n",
			ChatLib.getCenteredText("&b&ka&6ShitterModule&b&ka"),
			"\n&d Welcome! Idk wtf I'm doing so if my code sucks no shit. I did most of this for myself so if something don't work or ur not happy w it go fuck urself ig. (Or send me hate/nudes -> discord:kevinkeks ign:cookiekevin)\n &dCommands are &f",
			new TextComponent("/shittermodule").setClick("run_command", "/shittermodule").setHoverValue("&eOpen menu"), " &dand&f ",
			new TextComponent("/smgui").setClick("run_command", "/smgui").setHoverValue("&eOpen gui"), "&d\n&0--------------------------------------------------"))
		Settings.firstload = false;
	}
	firstloadreg.unregister();
});

register("command", () => Settings.openGUI()).setName("shittermodule").setAliases("sm");

register("command", () => togglem5rq()).setName("m5rq");
const m5rqkeybind = new KeyBind("M5rq", Keyboard.KEY_NONE, "ShitterModule");
m5rqkeybind.registerKeyPress(() => togglem5rq());
const togglem5rq = () => {
	Settings.m5rq = !Settings.m5rq;
	ChatLib.chat(prefix("M5rq") + (Settings.m5rq ? "enabled" : "disabled"))
}

register("command", () => togglegp()).setName("ghostpick").setAliases("gp");
const ghostpickkeybind = new KeyBind("Ghostpick", Keyboard.KEY_NONE, "ShitterModule");
ghostpickkeybind.registerKeyPress(() => togglegp());
const togglegp = () => {
	Settings.ghostpick = !Settings.ghostpick;
	ChatLib.chat(prefix("Ghostpick") + (Settings.ghostpick ? "enabled" : "disabled"))
}