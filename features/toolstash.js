import Settings from "../config";

const gui = new Gui();

const reg1 = register("chat", (item) => {
	threesecload(() => Object.keys(types).every(t => getIndexOf(t) != -1), () => {
		ChatLib.command(`${Settings.storagetype ? "backpack" : "enderchest"} ${Settings.storagenumber + 1}`);
		threesecload(() => Player.getContainer()?.size != 45 && Client.currentGui?.getClassName() === "GuiChest", () => insert(item))
	})
}).setCriteria("You found Scavenged ${item} with your Metal Detector!").unregister();

const types = {
	"Diamond Axe": "§cScavenged Diamond Axe",
	"Emerald Hammer": "§cScavenged Emerald Hammer",
	"Golden Hammer": "§cScavenged Golden Hammer",
	"Lapis Sword": "§cScavenged Lapis Sword",
}

function getIndexOf(type) {
	const inv = Player.getInventory();
	for (let i = 0; i < 36; i++) {
		let item = inv.getStackInSlot(i)
		if (!item) continue;
		if (item.name === types[type])
			return i
	}
	return -1;
}

function insert(type, attempts = 0) {
	const cont = Player.getContainer();
	if (!cont) return;
	const invindex = getIndexOf(type);
	if (invindex == -1) {
		if (attempts < 6) setTimeout(() => insert(type, attempts + 1), 500);
		return;
	}
	const contindex = cont.size + invindex - (invindex < 9 ? 9 : 45);
	cont?.click(contindex, true, "LEFT");
	if (Client.currentGui?.getClassName() !== "GuiChest" || Player.getInventory()?.getStackInSlot(invindex)) return;
	gui.open();
	Client.scheduleTask(() => gui.close());
}

function threesecload(conditionfunc, successfunc, attempts = 0) {
	if (conditionfunc())
		successfunc();
	else if (attempts < 6) setTimeout(() => threesecload(conditionfunc, successfunc, attempts + 1), 500);
}


const toolstash = {
	update() {
		if (Settings.maintoggle && Settings.toolstash)
			reg1.register();
		else
			reg1.unregister();
	}
}

export default toolstash;
