window.module.define('toObj', function () {


	function toObj(code) {
		let tagsArray = getTags(code);
		let treeObj = buildTree(tagsArray);
		return treeObj;
	}

	function buildTree(tagsArray) {
		const SELFCLOSED = ['!--', 'AREA', 'BASE', 'BASEFONT', 'BGSOUND', 'BR', 'COL', 'EMBED', 'FRAME', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'MENUITEM', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR', '!DOCTYPE'];
		const CONTAINSTEXT = ['PRE', 'TEXTAREA', 'LISTING'];

		let tree = {
			tagname: 'ROOT',
			children: []
		};

		let breadcrumbs = [tree];
		tagsArray.forEach(function(item, index, list) {
			const tagname = item.match(/^[^\s]+/).toString().slice(1);

			///////////////////////////
			const curElm = getLast(breadcrumbs)
			const newElm = {
				tagname,
				children: []
			};

			const isSelfCloseTag = item.charAt(item.length - 1) === '/' || SELFCLOSED.indexOf(tagname) > 0;
			if (isSelfCloseTag) {
				curElm.children.push(newElm);
			} else {
				const isCloseTag = item.charAt(1) === '/';
				if (isCloseTag) {
					breadcrumbs.pop();
				} else {
					curElm.children.push(newElm)
					breadcrumbs.push(newElm)
				}
			}
		});

		return tree;
	}

	///////////////////////////////////
	///

	function getTags(code) {
		return inp.value.match(/<[^>]+/g)
			.map(item => item.toUpperCase());
	}

	function getLast(arr) {
		return arr.slice(-1)[0] || {
			tagname: 'exception',
			children: []
		};
	}
	////////////////////////////

	return toObj;

});
