const gfsqueue = [];
let isexec = false;
export default function rungfs(param) {
	gfsqueue.push(param)
	execgfs();
}
function execgfs() {
	if (isexec || gfsqueue.length === 0) return;
	isexec = true;
	const nextparam = gfsqueue.shift();
	ChatLib.command(`gfs ${nextparam}`)
	setTimeout(() => {
		isexec = false;
		execgfs();
	}, 2000);
}

register("worldUnload", () => {
	gfsqueue.length = 0;
})