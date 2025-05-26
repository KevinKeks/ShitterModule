import DDM from './DogshitDisplayManager';

const smgui = new DDM("Shittermodule", "displaymanager/displaydata");

register("command", (reset) => {
	if (reset === "reset")
		smgui.reset();
	else
		smgui.open();
}).setName("smgui")

export default smgui;