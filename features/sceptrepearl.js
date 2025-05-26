import Settings from "../config";

register("playerInteract", (action) => {
	if (!Settings.sceptrepearl) return;
	if (action.toString() !== "RIGHT_CLICK_BLOCK") return;
	if (!Player.getHeldItem()?.name?.includes("Spirit Sceptre")) return
	const pearlindex = Player.getInventory()?.indexOf(id);
	if (pearlindex < 0 || pearlindex > 7) return;
	Player.setHeldItemIndex(pearlindex);
})