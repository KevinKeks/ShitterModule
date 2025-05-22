import Settings from "../config";
import SmDisplay from "../displaymanager/displaymanager";

const display = new SmDisplay("Helmet Display", updateFunction);
function updateFunction() {
	if (Settings.helmetdisplay)
		display.show();
	else
		display.hide();
}
updateFunction();

register("step", () => {
	if (!Settings.helmetdisplay) return;
	let helmet = Player.armor.getHelmet()?.getName();
	if (helmet) {
		const regex = new RegExp(Player.armor.getHelmet()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.modifier, "gi");
		helmet = helmet.replace(regex, "");
		helmet = helmet.replace(/✪/g, "");
	}
	display.setLine(0, helmet ? helmet : "");
}).setFps("3");
