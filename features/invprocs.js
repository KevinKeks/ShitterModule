import Settings from "../config";
import smgui from "../displaymanager/smgui";
import prefix from "../utils/prefix"
import { getdun, getp3 } from "../utils/dungeons"

const invprocsdisplay = smgui.addDisplay("Inv Procs")
const colours = ["&a", "&e", "&c", "&b"];
const lines = ["Bonzo", "Spirit", "Phoenix"];
invprocsdisplay.addLines([`&d${lines[0]} &aReady`, `&d${lines[1]} &aReady`, `&d${lines[2]} &aReady`]);
const reg1 = register("renderOverlay", () => { if ((!Settings.ipdponlydungeons || getdun()) && (!Settings.ipdponlyp3 || getp3())) invprocsdisplay.draw() }).unregister();

let bonzocd, spiritcd, phoenixcd = false;
let colorcode = 0;

const reg2 = register("packetReceived", packet => {
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
			break;

		case "Your Phoenix Pet saved you from certain death!":
			item = "Phoenix";
			phoenixcd = true;
			break;
	}
	if (!item) return;
	if (Settings.ipannounce)
		ChatLib.command(`pc ${item} procced!`);
	if (Settings.ipproctitle) {
		Client.showTitle("", "", 0, 1, 0);
		Client.showTitle(`${colours[colorcode]} ${item} proc`, "", 0, 20, 0);
	}
	invprocsdisplay.setLine(lines.indexOf(item), `&d${item} &cNot Ready`)
	colorcode++;
	onCooldown(item);
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S02PacketChat")).unregister();

const reg3 = register("worldLoad", () => {
	if (bonzocd) {
		bonzocd = false;
		onCdOver("Bonzo")
	}
	if (spiritcd) {
		spiritcd = false;
		onCdOver("Spirit")
	}
}).unregister();

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
	if (Settings.ipshowwhenready)
		ChatLib.chat(`${prefix("Invprocs")}${item} Ready`);
	if (Settings.ipreadytitle) {
		Client.showTitle("", "", 0, 1, 0);
		Client.showTitle(`&f${item} Ready`, "", 0, 40, 0);
	}
	invprocsdisplay.setLine(lines.indexOf(item), `&d${item} &aReady`)
}


const invprocs = {
	update() {
		if (Settings.maintoggle && Settings.ipdisplay) {
			reg1.register(); reg2.register(); reg3.register();
		}
		else if (Settings.maintoggle && (Settings.ipproctitle || Settings.ipannounce || Settings.ipshowwhenready || Settings.ipreadytitle)) {
			reg1.unregister();
			reg2.register(); reg3.register();
		}
		else {
			reg1.unregister(); reg2.unregister(); reg3.unregister();
		}
	}
}

export default invprocs;
