import Settings from "./config";
import betterbeam from "./features/betterbeam";
import deathtitle from "./features/deathtitle";
import ghostpick from "./features/ghostpick";
import m5rq from "./features/m5rq";
import miningability from "./features/miningability";
import pjoin from "./features/pjoin";
import invprocs from "./features/invprocs";
import refills from "./features/refills";
import sceptrepearl from "./features/sceptrepearl";
import helmetdisplay from "./features/helmetdisplay";
import trapperwarp from "./features/trapperwarp";
import nucleuswarp from "./features/nucleuswarp";
import inventorychat from "./features/inventorychat";
import compostergrab from "./features/compostgrab";
import toolstash from "./features/toolstash";

const firstloadreg = register("worldLoad", () => {
	firstloadreg.unregister();
	if (!Settings.firstload) return;
	Settings.firstload = false;
	ChatLib.chat(new Message(ChatLib.getChatBreak("&0-"),
		ChatLib.getCenteredText("&b&ka&6ShitterModule&b&ka"),
		"\n&d Welcome! Idk wtf I'm doing so if my code sucks no shit. I did most of this for myself so if something don't work or ur not happy w it go fuck urself ig. (Or send me hate/nudes -> discord:kevinkeks ign:cookiekevin)\n &dCommands are &f",
		new TextComponent("/shittermodule").setClick("run_command", "/shittermodule").setHoverValue("&eOpen menu"), " &dand&f ",
		new TextComponent("/smgui").setClick("run_command", "/smgui").setHoverValue("&eOpen gui"), ChatLib.getChatBreak("&0-")))
});

register("command", () => Settings.openGUI()).setName("shittermodule").setAliases("sm");


const features = [betterbeam, deathtitle, ghostpick, m5rq, miningability, pjoin, invprocs, refills, sceptrepearl, helmetdisplay, trapperwarp, nucleuswarp, inventorychat, compostergrab, toolstash];

const SettingsGui = Java.type("gg.essential.vigilance.gui.SettingsGui");
register("guiClosed", gui => {
	if (!(gui instanceof SettingsGui)) return;
	update();
})

function update() {
	features.forEach(f => f.update())
}
update();
