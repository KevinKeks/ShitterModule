import PogObject from "../../PogData";

const gui = new Gui();
const displays = {};
const updatefunctions = [];
let offscreen = [];
const displaydata = new PogObject("ShitterModule", {}, "./displaymanager/displaydata.json");
const width = () => { return Renderer.screen.getWidth() };
const height = () => { return Renderer.screen.getHeight() };
const info = new Display().setAlign("CENTER");
const alignments = ["LEFT", "CENTER", "RIGHT"];
let selected = undefined;
let lambdax, lambday;

export default class Dmdisplay {
	constructor(name, updateFunction, x, y, align, background) {
		if (!name || !updateFunction) return;
		this.display = new Display();
		displays[name] = this.display;
		updatefunctions.push(updateFunction);
		if (!displaydata[name])
			displaydata[name] = {
				x: (x ?? 100) / width(),
				y: (y ?? 100) / height(),
				align: align ?? "LEFT",
				background: background ?? false,
			}
		this.display.setRenderLoc(displaydata[name].x * width(), displaydata[name].y * height())
			.setAlign(displaydata[name].align)
			.setBackgroundColor(Renderer.color(0, 0, 0, 130))
			.setBackground(displaydata[name].background ? "FULL" : "NONE");
		return this.display;
	}
}

export function updateDisplays() {
	Client.scheduleTask(() => {
		updatefunctions.forEach(func => func())
	})
}


register("command", (reset) => {
	if (reset === "reset") {
		for (d in displays) {
			displaydata[d] = {
				x: 100 / width(),
				y: 100 / height(),
				align: "LEFT",
			}
			displays[d].setRenderLoc(100, 100)
			displays[d].setAlign("LEFT")
		}
	}
	gui.open()
}).setName("smgui")


gui.registerOpened(() => {
	for (d in displays) {
		displays[d].setBackground("FULL").setBackgroundColor(Renderer.color(63, 63, 63, 125));
		displays[d].setRenderLoc(displaydata[d].x * width(), displaydata[d].y * height());
		if (!displays[d].getShouldRender()) {
			offscreen.push(d);
		}
		displays[d].show();
	}
})

gui.registerClosed(() => {
	for (d in displays) {
		displays[d].setBackgroundColor(Renderer.color(0, 0, 0, 130)).setBackground(displaydata[d].background ? "FULL" : "NONE");
		if (offscreen.includes(d)) {
			displays[d].hide();
		}
	}
	offscreen = [];
	selected = undefined;
	info.hide();
	displaydata.save();
})

gui.registerClicked((x, y, type) => {
	for (d in displays) {
		let factor = (alignments.indexOf(displays[d].getAlign().toString()) / 2.0)

		if (x > displays[d].getRenderX() - (displays[d].getWidth() * factor)
			&& x < displays[d].getRenderX() + (displays[d].getWidth() * (1.0 - factor))
			&& y > displays[d].getRenderY()
			&& y < displays[d].getRenderY() + displays[d].getHeight()) {
			selected = d;
			selecteddp = displays[selected];
			selecteddp.setBackgroundColor(Renderer.color(255, 255, 255, 30));
			if (type == 0.0) {
				lambdax = selecteddp.getRenderX() - x;
				lambday = selecteddp.getRenderY() - y;
			}
			else if (type == 1.0) {
				nextalindex = (alignments.indexOf(selecteddp.getAlign().toString()) + 1) % 3;

				let nextalignment = alignments[nextalindex];
				selecteddp.setAlign(nextalignment);
				displaydata[selected].align = nextalignment;

				let renderadjustment = selecteddp.getRenderX() + selecteddp.getWidth() * (nextalindex > 0 ? 0.5 : -1);
				selecteddp.setRenderX(renderadjustment);
				displaydata[selected].x = renderadjustment / width();

			}
			else if (type == 2.0) {
				displaydata[selected].background = !displaydata[selected].background;
			}
			updateSelected();
			return;
		}
		if (selected) displays[selected].setBackgroundColor(Renderer.color(63, 63, 63, 125));
		selected = undefined;
		info.hide();
	}
})

gui.registerMouseDragged((x, y, type) => {
	if (selected && type == 0.0) {
		updateSelected(x + lambdax, y + lambday);
	}
})

gui.registerKeyTyped((c, kc) => {
	if (!selected) return;
	let w = 0, h = 0;
	if (kc == 203) {
		w = -1;
	}
	else if (kc == 200) {
		h = -1;
	}
	else if (kc == 205) {
		w = 1;
	}
	else if (kc == 208) {
		h = 1
	} else
		return;

	updateSelected(displays[selected].getRenderX() + w, displays[selected].getRenderY() + h);
})


function updateSelected(x, y) {
	if (!selected) return;
	if (x && y) {
		displaydata[selected].x = x / width();
		displaydata[selected].y = y / height();
		displays[selected].setRenderLoc(x, y);
	}
	x = displays[selected].getRenderX();
	y = displays[selected].getRenderY();
	let a = displays[selected].getAlign().toString();
	let bg = displaydata[selected].background;
	let factor = alignments.indexOf(a) / 2.0 - 0.5
	info.setRenderLoc(x - displays[selected].getWidth() * factor, y - 20);
	info.setLine(0, `x:${x | 0} y:${y | 0}`);
	info.setLine(1, `a:${a.toLowerCase()} bg:${bg}`);
	info.show();
}

register("gameLoad", () => {
	for (d in displays) {
		displays[d].setRenderLoc(displaydata[d].x * width(), displaydata[d].y * height());
	}
	updateDisplays();
})