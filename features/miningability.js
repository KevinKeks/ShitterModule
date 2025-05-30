import Settings from "../config";
import { getdun } from "../utils/dungeons";

const abilityreg = new RegExp(/Mining Speed Boost|Pickobulus|Anomalous Desire|Maniac Miner|Gemstone Infusion|Sheer Force/);

const reg1 = register("chat", (ability) => {
	if (getdun()) return;
	if (!abilityreg.test(ability)) return;
	setTimeout(() => {
		Client.showTitle("", "", 0, 1, 0)
		Client.showTitle("&6" + ability, "", 0, 40, 0)
		if (Settings.masound)
			World.playSound("random.orb", 1, 0.5);
	}, 1);
}).setCriteria("${ability} is now available!").unregister();


const miningability = {
	update() {
		if (Settings.maintoggle && Settings.miningability)
			reg1.register();
		else
			reg1.unregister();
	}
}

export default miningability;
