import Settings from "../config";

const reg1 = register("playerInteract", (action) => {
	if (action.toString() !== "RIGHT_CLICK_BLOCK") return;
	if (!Player.getHeldItem()?.name?.includes("Spirit Sceptre")) return
	const pearlindex = Player.getInventory()?.indexOf(368);
	if (pearlindex < 0 || pearlindex > 7) return;
	Player.setHeldItemIndex(pearlindex);
}).unregister();


const sceptrepearl = {
	update() {
		if (Settings.maintoggle && Settings.sceptrepearl)
			reg1.register();
		else
			reg1.unregister();
	}
}

export default sceptrepearl;
