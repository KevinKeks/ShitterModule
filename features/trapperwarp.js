import Settings from "../config"

const reg1 = register("chat", () => {
    if (!Settings.trapperwarp) return;
    ChatLib.command("warp trapper");
}).setCriteria("Return to the Trapper soon to get a new animal to hunt!").unregister();

const reg2 = register("chat", () => {
    if (!Settings.trapperwarpdesert) return;
    ChatLib.command("warp desert");
}).setCriteria(/\[NPC\] Trevor: You can find your \w+ animal near the Desert Settlement\./).unregister();


const trapperwarp = {
    update() {
        if (Settings.maintoggle) {
            Settings.trapperwarp ? reg1.register() : reg1.unregister();
            Settings.trapperwarpdesert ? reg2.register() : reg2.unregister();
        }
        else {
            reg1.unregister(); reg2.unregister();
        }
    }
}

export default trapperwarp;
