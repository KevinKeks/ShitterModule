import Settings from "../config";
import prefix from "../utils/prefix";

let cropthreshold;
let fuelthreshold;

const reg1 = register("GuiOpened", () => {
	if (Settings.cropthreshold === "" || Settings.fuelthreshold === "") return ChatLib.chat(prefix("Compostergrab") + "No threshhold provided");
	Client.scheduleTask(() => {
		const cont = Player.getContainer();
		if (!cont || cont.name !== "Composter") return;
		cropthreshold = Math.trunc(Number(Settings.cropthreshold?.trim()));
		fuelthreshold = Math.trunc(Number(Settings.fuelthreshold?.trim()));
		if (isNaN(cropthreshold) || isNaN(fuelthreshold)) return ChatLib.chat(prefix("Compostergrab") + "Failed to read threshold");
		grab();
	});
}).unregister();

function grab(attempts = 0) {
	const cont = Player.getContainer();
	if (!cont || cont.size < 90) return;
	const croplore = cont.getStackInSlot(46)?.getLore();
	const fuellore = cont.getStackInSlot(52)?.getLore();
	if (!croplore || !fuellore) {
		if (attempts < 6) setTimeout(() => grab(attempts + 1), 500);
		return;
	}
	let cropmeter = croplore[1].match(/§r §e([\d|,]*)\.?.?§6\/§e(\d*)k/)?.map(i => parseInt(i.replace(",", "")));
	let fuelmeter = fuellore[1].match(/§r §e([\d|,]*)\.?.?§6\/§e(\d*)k/)?.map(i => parseInt(i.replace(",", "")));
	if (!cropmeter || !fuelmeter) return;
	let cropneeded = Math.trunc((cropmeter[2] * 1000 - cropmeter[1]) / 25600) - (getIndexOf("Crop")?.getStackSize() ?? 0);
	let fuelneeded = Math.trunc((fuelmeter[2] * 1000 - fuelmeter[1]) / 10000) - (getIndexOf("Fuel")?.getStackSize() ?? 0);

	let cd = false;
	if (cropmeter[1] < cropthreshold) {
		if (cropneeded > 0 && Settings.compostergrab) {
			ChatLib.command("gfs Box_of_Seeds " + cropneeded);
			cd = true;
		}
		setTimeout(() => insert("Crop"), 500);
	}
	if (fuelmeter[1] < fuelthreshold) {
		setTimeout(() => {
			if (fuelneeded > 0 && Settings.compostergrab)
				ChatLib.command("gfs Oil_Barrel " + fuelneeded)
			setTimeout(() => insert("Fuel"), cd ? 500 : 1500);
		}, cd ? 2000 : 0);
	}
}

const types = {
	Crop: "§9Box of Seeds",
	Fuel: "§aOil Barrel",
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
	if (!Settings.composterinsert) return;
	const cont = Player.getContainer();
	if (!cont) return;
	let invindex = getIndexOf(type);
	if (invindex == -1) {
		if (attempts < 6) setTimeout(() => insert(type, attempts + 1), 500);
		return;
	}
	const contindex = cont.size + invindex - (invindex < 9 ? 9 : 45);
	cont?.click(contindex, false, "MIDDLE");
}


const compostergrab = {
	update() {
		if (Settings.maintoggle && (Settings.compostergrab || Settings.composterinsert))
			reg1.register();
		else
			reg1.unregister();
	}
}

export default compostergrab;
