import Settings from "../config";
import { getdun } from "../utils.js"

let pickaxeindex = getIndex(278);
if (!pickaxeindex)
	pickaxeindex = getIndex(285);
let axeindex = getIndex(286);
let shearsindex = getIndex(359);

register("GuiClosed", () => {
	pickaxeindex = getIndex(278);
	if (!pickaxeindex)
		pickaxeindex = getIndex(285);
	axeindex = getIndex(286);
	shearsindex = getIndex(359);
})

function getIndex(id) {
	let index = Player.getInventory()?.indexOf(id);
	if (index > 0 && index < 7)
		return index;
}

let swap = false;
const pickaxereg = /Stone(?! Button)|Quartz|Stained Clay|Hopper|Block of (Iron|Gold|Coal|Diamond)|Iron Bars|Ice|Brick|Cauldron|Anvil/i;
const axereg = /Wood|((Oak|Birch|Acacia|Jungle|Spruce) (Stairs|Slab|Fence))|Sign|Melon/i;
const shearsreg = /Wool|Leaves/i;

register("HitBlock", () => {
	if (!Settings.ghostpick || (Settings.gpdungeonsonly && !getdun()) || Player.getHeldItemIndex() != Settings.gpslot || Player.getMotionY() != -0.0784000015258789) return;
	let block = Player.lookingAt().type.getName();
	if (block.match(pickaxereg) && pickaxeindex)
		Player.setHeldItemIndex(pickaxeindex);
	else if (block.match(axereg) && axeindex)
		Player.setHeldItemIndex(axeindex);
	else if (block.match(shearsreg) && shearsindex)
		Player.setHeldItemIndex(shearsindex);
	else return;
	swap = true;
});

register("BlockBreak", () => {
	let itemid = Player.getHeldItem()?.getID();
	if (Settings.ghostpick && Settings.gpcontinuous && (!Settings.gpdungeonsonly || getdun()) && swap && (itemid == 278 || itemid == 285 || itemid == 286 || itemid == 359))
		Player.setHeldItemIndex(Settings.gpslot);
	swap = false;
});
