import Settings from "../config";
import { getdun } from "../utils/dungeons";

const reg1 = register("spawnParticle", (p, pp) => {
	if (!getdun() || pp.func_179346_b() != "fireworksSpark") return;
	let distance = p.distanceTo(Player.getX(), Player.getY(), Player.getZ());
	p.scale(0.5);
	p.setMaxAge(distance + 1);
	p.setAlpha(0);
}).unregister();


const betterbeam = {
	update() {
		if (Settings.maintoggle && Settings.betterbeam)
			reg1.register();
		else
			reg1.unregister();
	}
}

export default betterbeam;
