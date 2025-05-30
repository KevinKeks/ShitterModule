import Settings from "../config";
import smgui from "../displaymanager/smgui";

const display = smgui.addDisplay("Helmet Display").addLine(getHelmetName() || "Helmet Display");

const reg1 = register("renderOverlay", () => {
	const helmetname = getHelmetName();
	if (!helmetname) return;
	display.setLine(0, helmetname).draw();
}).unregister();

function getHelmetName() {
	const helmet = Player.armor.getHelmet();
	if (!helmet) return;
	let helmetname = Player.armor.getHelmet()?.getName();
	const regex = new RegExp(helmet.getNBT()?.toObject()?.tag?.ExtraAttributes?.modifier, "gi");
	helmetname = helmetname.replace(regex, "").replace(/✪/g, "");
	return helmetname;
}


const helmetdisplay = {
	update() {
		if (Settings.maintoggle && Settings.helmetdisplay)
			reg1.register();
		else
			reg1.unregister();
	}
}

export default helmetdisplay;
