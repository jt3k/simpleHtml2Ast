window.module.define('Application', function () {
	const html2Obj = window.module('toObj');
	const obj2Html = window.module('toHtml');

	const inp = document.getElementById('inp');
	const out = document.getElementById('out');

	inp.oninput = window.onload = function() {
		let code = inp.value;
		let tree = html2Obj(code);
		let dom = obj2Html(tree);

		out.innerHTML = '';
		out.appendChild(dom)
		console.log(tree, dom);
	}


});

