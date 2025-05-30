import Settings from "../config";
import prefix from "../utils/prefix"
import { getdun } from "../utils/dungeons"

let swap = false;
const pickaxereg = /Stone(?! Button)|Quartz|Stained Clay|Hopper|Block of (Iron|Gold|Coal|Diamond)|Iron Bars|Ice|Brick|Cauldron|Anvil/i;
const axereg = /Wood|((Oak|Birch|Acacia|Jungle|Spruce) (Stairs|Slab|Fence))|Sign|Melon/i;
const shearsreg = /Wool|Leaves/i;
const toolids = {
	pickaxe: [278, 285],
	axe: [286],
	shears: [359],
}

let hotbartools = {};
gettools();

function gettools() {
	hotbartools.pickaxeindex = getIndex(toolids.pickaxe[0]) ?? getIndex(toolids.pickaxe[1]);
	hotbartools.axeindex = getIndex(toolids.axe[0]);
	hotbartools.shearsindex = getIndex(toolids.shears[0]);
}

function getIndex(id) {
	let index = Player.getInventory()?.indexOf(id);
	if (index >= 0 && index <= 7)
		return index;
	return null;
}

const reg1 = register("GuiClosed", () => gettools()).unregister();

const reg2 = register("HitBlock", () => {
	const heldindex = Player.getHeldItemIndex();
	if (Settings.gpdungeonsonly && !getdun() || heldindex != Settings.gpslot || Object.values(hotbartools).includes(heldindex) || Player.getMotionY() != -0.0784000015258789) return;
	let block = Player.lookingAt().type.getName();
	if (block.match(pickaxereg) && hotbartools.pickaxeindex !== null)
		Player.setHeldItemIndex(hotbartools.pickaxeindex);
	else if (block.match(axereg) && hotbartools.axeindex !== null)
		Player.setHeldItemIndex(hotbartools.axeindex);
	else if (block.match(shearsreg) && hotbartools.shearsindex !== null)
		Player.setHeldItemIndex(hotbartools.shearsindex);
	else return;
	swap = true;
}).unregister();

const reg3 = register("BlockBreak", () => {
	let itemid = Player.getHeldItem()?.getID();
	if (Settings.gpcontinuous && (!Settings.gpdungeonsonly || getdun()) && swap && [278, 285, 286, 359].includes(itemid))
		Player.setHeldItemIndex(Settings.gpslot);
	swap = false;
}).unregister();

const reg4 = register("command", () => togglegp()).setName("ghostpick").setAliases("gp").unregister();
const ghostpickkeybind = new KeyBind("Ghostpick", Keyboard.KEY_NONE, "ShitterModule");
const reg5 = ghostpickkeybind.registerKeyPress(() => togglegp()).unregister();
const togglegp = () => {
	Settings.ghostpick = !Settings.ghostpick;
	ChatLib.chat(prefix("Ghostpick") + (Settings.ghostpick ? "enabled" : "disabled"))
	ghostpick.update();
}


const ghostpick = {
	update() {
		if (Settings.maintoggle && Settings.ghostpick) {
			reg1.register(); reg2.register(); reg3.register(); reg4.register(); reg5.register();
		}
		else if (Settings.maintoggle) {
			reg1.unregister(); reg2.unregister(); reg3.unregister();
			reg4.register(); reg5.register();
		}
		else {
			reg1.unregister(); reg2.unregister(); reg3.unregister(); reg4.unregister(); reg5.unregister();
		}
	}
}

export default ghostpick;
