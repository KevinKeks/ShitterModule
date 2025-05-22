import Settings from "../config";
import { getDungeon } from "../utils.js"


let pickaxeindex = getIndex(278);
if (pickaxeindex == 8)
	pickaxeindex = getIndex(285);
let axeindex = getIndex(286);
let shearsindex = getIndex(359);

function getIndex(id) {
	let index = Player.getInventory()?.indexOf(id);
	if (index < 0 || index > 7)
		return 8;
	else
		return index;
}

register("GuiClosed", () => {
	pickaxeindex = getIndex(278);
	if (pickaxeindex == -1)
		pickaxeindex = getIndex(285);
	axeindex = getIndex(286);
	shearsindex = getIndex(359);
})


let swap = false;

register("HitBlock", () => {
	if (Settings.ghostpick && (!Settings.gpdungeonsonly || getDungeon()) && Player.getHeldItemIndex() == Settings.gpslot && Player.getMotionY() == -0.0784000015258789) {
		let block = Player.lookingAt().type.getName();
		if (block.match(/Stone(?! Button)|Quartz|Stained Clay|Hopper|Block of (Iron|Gold|Coal|Diamond)|Iron Bars|Ice|Brick|Cauldron|Anvil/i) && pickaxeindex != 8)
			Player.setHeldItemIndex(pickaxeindex);
		else if (block.match(/Wood|((Oak|Birch|Acacia|Jungle|Spruce) (Stairs|Slab|Fence))|Sign|Melon/) && axeindex != 8)
			Player.setHeldItemIndex(axeindex);
		else if (block.match(/Wool|Leaves/) && shearsindex != 8)
			Player.setHeldItemIndex(shearsindex);
		swap = true;
	} else {
		swap = false;
	}
});

register("BlockBreak", () => {
	let itemid = Player.getHeldItem()?.getID();
	if (Settings.ghostpick && Settings.gpcontinuous && (!Settings.gpdungeonsonly || getDungeon()) && swap && (itemid == 278 || itemid == 285 || itemid == 286 || itemid == 359)) {
		Player.setHeldItemIndex(Settings.gpslot);
	}
	swap = false;
});


register("command", () => {
	ChatLib.chat(Player.lookingAt()?.type?.getName());
}).setName("smgetblock")