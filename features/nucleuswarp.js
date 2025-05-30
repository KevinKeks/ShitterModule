import Settings from "../config"

const reg1 = register("chat", (type) => {
    if (!Settings[type.toLowerCase() + "warp"]) return;
    ChatLib.command("warp nucleus");
}).setCriteria(/                               ? ?(\w+) Crystal/).unregister();


const nucleuswarp = {
    update() {
        if (Settings.maintoggle && Settings.nucleuswarp)
            reg1.register();
        else
            reg1.unregister();
    }
}

export default nucleuswarp;
