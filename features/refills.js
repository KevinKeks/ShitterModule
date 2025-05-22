import Settings from '../config';
import { rungfs } from '../utils'

let pcd = false;
let bcd = false;

register("chat", () => {
	if (Settings.pearlrefill) {
		let needed = getNeeded("§fEnder Pearl", 16);
		if (16 > needed && needed > 0) {
			if (pcd) return;
			pcd = true;
			setTimeout(() => pcd = false, 2000);
			rungfs((`ENDER_PEARL ${needed}`))
		}
	}
	if (Settings.boomrefill) {
		let needed = getNeeded("§9Superboom TNT");
		if (64 > needed && needed > 0) {
			if (bcd) return;
			bcd = true;
			setTimeout(() => bcd = false, 2000);
			rungfs((`SUPERBOOM_TNT ${needed}`))
		}
	}
}).setCriteria("Starting in 1 second.");

register("clicked", (_, __, btn, state) => {
	if (!state) return;
	if (Settings.pearlrefill && Player.getHeldItem()?.name === "§fEnder Pearl") {
		if (btn != 1) return;
		let needed = getNeeded("§fEnder Pearl", 16)
		if (needed > 7) {
			if (pcd) return;
			pcd = true;
			setTimeout(() => pcd = false, 2000);
			rungfs((`ENDER_PEARL ${needed}`))
		}
	}
	if (Settings.pearlrefill && Player.getHeldItem()?.name === "§9Superboom TNT") {
		let needed = getNeeded("§9Superboom TNT")
		if (needed > 31) {
			if (bcd) return;
			bcd = true;
			setTimeout(() => bcd = false, 2000);
			rungfs((`SUPERBOOM_TNT ${needed}`))
		}
	}
})

function getNeeded(item, maxStack) {
	if (!item) return; if (!maxStack) maxStack = 64;
	for (i of Player.getInventory()?.getItems()) {
		if (i && i.name.match(item))
			return maxStack - i.getStackSize();
	}
	return 0;
}
