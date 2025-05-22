import Settings from "../config";
import { getDungeon } from "../utils.js";

register("spawnParticle", (p, pp) => {
	if (Settings.betterbeam && getDungeon() && pp.func_179346_b() == "fireworksSpark") {
		let distance = p.distanceTo(Player.getX(), Player.getY(), Player.getZ());
		p.scale(0.5);
		p.setMaxAge(distance + 1);
		p.setAlpha(0);
	}
});