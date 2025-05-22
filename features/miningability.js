import Settings from "../config";
import { getDungeon } from "../utils";



register("chat", (ability) => {
	if (!Settings.miningability || getDungeon()) return;
	if (!/Mining Speed Boost|Pickobulus|Anomalous Desire|Maniac Miner|Gemstone Infusion|Sheer Force/.test(ability)) return;
	Client.showTitle("init", "", 0, 1, 0)
	setTimeout(() => {
		Client.showTitle("&6" + ability, "", 0, 40, 0)
		if (Settings.masound)
			World.playSound("random.orb", 1, 0.5);
	}, 1);
}).setCriteria("${ability} is now available!");