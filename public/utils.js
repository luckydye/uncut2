// global util functions

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

window.onload = () => {
	navigator.registerProtocolHandler("web+uncut", "http://127.0.0.1:5500/public/index.html?connect=%s", "Uncut2 Multiplayer");

	const a = document.createElement('a');
	a.href = "web+uncut:" + client.id;
	a.className = "join-btn";
	a.innerHTML = "Join Game";
	document.body.appendChild(a);

	const search = parseSearch(location.search);
	const connId = search.connect;

	console.log('autoconnect:', connId);
}

function parseSearch(str) {
    const res = {};
    str.substring(1).split("&").map(item => item.split("=")).forEach(item => {
        res[item[0]] = unescape(item[1]);
    });
    return res;
}
