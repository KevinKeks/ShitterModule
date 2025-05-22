import Settings from "../config";

let pearlindex = getIndex(368);

register("guiClosed", () => {
	pearlindex = getIndex(368)
})

function getIndex(id) {
	let index = Player.getInventory()?.indexOf(id);
	if (index < 0 || index > 7)
		return 8;
	else
		return index;
}

register("playerInteract", (action) => {
	if (!Settings.sceptrepearl) return;
	if (action.toString() === "RIGHT_CLICK_BLOCK") {
		if (Player.getHeldItem()?.name?.includes("Spirit Sceptre")) {
			if (pearlindex != 8)
				Player.setHeldItemIndex(pearlindex);
		}
	}
})