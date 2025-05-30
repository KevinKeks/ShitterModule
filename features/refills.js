import Settings from '../config';
import rungfs from '../utils/gfsqueue'

let pcd = false;
let bcd = false;

const reg1 = register("chat", () => {
	if (Settings.pearlrefill) {
		let needed = getNeeded("§fEnder Pearl", 16);
		if (16 < needed && needed > 0) {
			if (!pcd) {
				pcd = true;
				setTimeout(() => pcd = false, 2000);
				rungfs((`ENDER_PEARL ${needed}`))
			}
		}
	}
	if (Settings.boomrefill) {
		let needed = getNeeded("§9Superboom TNT");
		if (64 > needed && needed > 0) {
			if (!bcd) {
				bcd = true;
				setTimeout(() => bcd = false, 2000);
				rungfs((`SUPERBOOM_TNT ${needed}`))
			}
		}
	}
}).setCriteria("Starting in 1 second.").unregister();

const reg2 = register("clicked", (_, __, btn, state) => {
	if (!state) return;
	if (Client.currentGui.get() !== null) return;
	if (Settings.pearlrefill && Player.getHeldItem()?.name === "§fEnder Pearl") {
		if (btn == 1) {
			let needed = getNeeded("§fEnder Pearl", 16)
			if (needed > 7) {
				if (!pcd) {
					pcd = true;
					setTimeout(() => pcd = false, 2000);
					rungfs((`ENDER_PEARL ${needed}`))
				}
			}
		}
	}
	if (Settings.boomrefill && Player.getHeldItem()?.name === "§9Superboom TNT") {
		if (Player.lookingAt().name === "Air") return;
		let needed = getNeeded("§9Superboom TNT")
		if (needed > 31) {
			if (!bcd) {
				bcd = true;
				setTimeout(() => bcd = false, 2000);
				rungfs((`SUPERBOOM_TNT ${needed}`))
			}
		}
	}
}).unregister();

function getNeeded(item, maxStack) {
	if (!item) return; if (!maxStack) maxStack = 64;
	for (i of Player.getInventory()?.getItems()) {
		if (i && i.name.match(item))
			return maxStack - i.getStackSize();
	}
	return 0;
}


const refills = {
	update() {
		if (Settings.maintoggle && (Settings.pearlrefill || Settings.boomrefill)) {
			reg1.register(); reg2.register();
		}
		else {
			reg1.unregister(); reg2.unregister();
		}
	}
}

export default refills;
