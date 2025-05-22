import Settings from "../config";
import SmDisplay from "../displaymanager/displaymanager";
import { prefix, getDungeon, getp3 } from "../utils"

const display = new SmDisplay("Invprocs Display", updateFunction);
function updateFunction() {
	if (!Settings.ipdisplay || Settings.ipdponlydungeons && !getDungeon() || Settings.ipdponlyp3 && !getp3())
		display.hide();
	else
		display.show();
};
updateFunction();


let colorcode = 0;
const colours = ["&a", "&e", "&c", "&b"];
let bonzocd, spiritcd, phoenixcd = false;
const lines = ["Bonzo", "Spirit", "Phoenix"];
display.addLines([`&d${lines[0]} &aReady`, `&d${lines[1]} &aReady`, `&d${lines[2]} &aReady`]);

register("packetReceived", packet => {
	if (packet.func_179841_c() === 2) return;
	const message = ChatLib.removeFormatting(packet.func_148915_c().func_150260_c());

	let item = "";
	switch (message) {
		case "Your ⚚ Bonzo's Mask saved your life!":
			item = "Bonzo";
			bonzocd = true;

			break;

		case "Second Wind Activated! Your Spirit Mask saved your life!":
			item = "Spirit";
			spiritcd = true;
			display.setLine(1, "&dSpirit &cNot Ready")
			break;

		case "Your Phoenix Pet saved you from certain death!":
			item = "Phoenix";
			phoenixcd = true;
			display.setLine(2, "&dPhonix &cNot Ready")
			break;
	}
	if (!item) return;
	if (Settings.ipannounce)
		ChatLib.command(`pc ${item} procced!`);
	if (Settings.ipproctitle) {
		Client.showTitle("", "", 0, 1, 0);
		Client.showTitle(colours[colorcode] + `${item} proc`, "", 0, 20, 0);
	}
	display.setLine(lines.indexOf(item), `&d${item} &cNot Ready`)
	colorcode++;
	onCooldown(item);
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S02PacketChat"));

register("worldLoad", () => {
	if (bonzocd) {
		bonzocd = false;
		onCdOver("Bonzo")
	}
	if (spiritcd) {
		spiritcd = false;
		onCdOver("Spirit")
	}
});

function onCooldown(item) {
	switch (item) {
		case "Bonzo":
			setTimeout(() => {
				if (!bonzocd) return;
				bonzocd = false;
				onCdOver(item)
			}, 360000)
			break;
		case "Spirit":
			setTimeout(() => {
				if (!spiritcd) return;
				spiritcd = false;
				onCdOver(item)
			}, 30000)
			break;
		case "Phoenix":
			setTimeout(() => {
				if (!phoenixcd) return;
				phoenixcd = false;
				onCdOver(item)
			}, 60000)
			break;
	}
}

function onCdOver(item) {
	colorcode--;
	if (Settings.ipshowwhenReady)
		ChatLib.chat(`${prefix("Invprocs")}${item} Ready`);
	if (Settings.ipReadytitle) {
		Client.showTitle("", "", 0, 1, 0);
		Client.showTitle(item + " Ready", "", 0, 40, 0);
	}
	display.setLine(lines.indexOf(item), `&d${item} &aReady`)
}
