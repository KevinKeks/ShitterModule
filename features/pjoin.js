import Settings from "../config";

const reg1 = register("chat", (name) => {
	name = name.replace(/\[[\w+\+-]+] /, "").trim();
	ChatLib.command("p " + name);
}).setCriteria("From ${name}: settings").unregister();


const pjoin = {
	update() {
		if (Settings.maintoggle && Settings.pjoin)
			reg1.register();
		else
			reg1.unregister();
	}
}

export default pjoin;
