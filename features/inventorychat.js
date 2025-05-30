import Settings from "../config";

const chatgui = new Text("", 0, 0);
let message = "";
let chatting = false;

const chatreg = register("GuiRender", (x, y, gui) => {
	Renderer.drawRect(-1946157056, 2, Renderer.screen.getHeight() - 14, ChatLib.getChatWidth(), 12);
	chatgui.draw(4, Renderer.screen.getHeight() - 12);
}).unregister();

const guiclosereg = register("GuiClosed", () => {
	chatting = false;
	chatreg.unregister();
}).unregister();

const reg1 = register("GuiKey", (k, kc, _, e) => {
	if (Client.isControlDown() && kc == Client.getKeyBindFromDescription("key.chat")?.getKeyCode()) {
		chatting = !chatting;
		if (chatting) {
			chatgui.setString("_");
			chatreg.register();
			guiclosereg.register();
		}
		else {
			chatgui.setString("");
			chatreg.unregister();
			guiclosereg.unregister();
		}
		message = "";
	}

	if (!chatting) return;

	if (/[\w|!|"|#|\$|%|&|'|\(|\)|\*|\+|,|\-|\.|/:|;|<|=|>|\?|@|\[|\\|\]|\^|'|\{|\|\}|~|⌂|Ç|ü|é|â|ä|à|å|ç|ê|ë|è|ï|î|ì|Ä|Å|É|æ|Æ|ô|ö||ò|û|ù|ÿ|Ö|Ü|ø|£|Ø|×|ƒ|á|í|ó|ú|ñ|Ñ|ª|º|¿|®|¬|½|¼|¡|«|»| ]/.test(k)) {
		message += k;
		chatgui.setString(message + "_");
	}
	else if (/[\b]/.test(k)) {
		if (message) {
			message = message.substring(0, message.length - 1);
			chatgui.setString(message + "_");
		}
	}
	else if (/\r/.test(k)) {
		ChatLib.say(message);
		message = "";
		chatting = false;
		chatreg.unregister();
	} else return;
	cancel(e);
}).unregister();


const inventorychat = {
	update() {
		if (Settings.maintoggle && Settings.inventorychat)
			reg1.register();
		else {
			reg1.unregister(); chatreg.unregister(); guiclosereg.unregister();
		}
	}
}

export default inventorychat;
