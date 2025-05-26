import Settings from "../config";
import { indun } from "../utils";

const abilityreg = new RegExp(/Mining Speed Boost|Pickobulus|Anomalous Desire|Maniac Miner|Gemstone Infusion|Sheer Force/);

register("chat", (ability) => {
	if (!Settings.miningability || indun) return;
	if (!abilityreg.test(ability)) return;
	setTimeout(() => {
		Client.showTitle("", "", 0, 1, 0)
		Client.showTitle("&6" + ability, "", 0, 40, 0)
		if (Settings.masound)
			World.playSound("random.orb", 1, 0.5);
	}, 1);
}).setCriteria("${ability} is now available!");