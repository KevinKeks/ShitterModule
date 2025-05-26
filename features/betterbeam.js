import Settings from "../config";
import { getdun } from "../utils.js";

register("spawnParticle", (p, pp) => {
	if (!Settings.betterbeam || !getdun() || pp.func_179346_b() != "fireworksSpark") return;
	let distance = p.distanceTo(Player.getX(), Player.getY(), Player.getZ());
	p.scale(0.5);
	p.setMaxAge(distance + 1);
	p.setAlpha(0);
});