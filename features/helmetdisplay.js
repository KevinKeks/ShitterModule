import Settings from "../config";
import smgui from "../displaymanager/smgui";

const helmetdisplay = smgui.addDisplay("Helmet").addLine();

register("renderOverlay", () => {
	if (!Settings.helmetdisplay) return;
	let helmet = Player.armor.getHelmet()?.getName();
	if (!helmet) return;
	const regex = new RegExp(Player.armor.getHelmet()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.modifier, "gi");
	helmet = helmet.replace(regex, "").replace(/✪/g, "");
	helmetdisplay.setLine(0, helmet ?? "");
	helmetdisplay.draw();
})
