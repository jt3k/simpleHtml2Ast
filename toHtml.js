window.module.define('toHtml', function () {


	function toHtml(obj) {
		function req(arr, _deep, _memo) {
			_memo = _memo || document.createElement('div');
			_deep = ++_deep || 0;

			arr.forEach(function(objNode) {
				let child = document.createElement('div');
				let text = document.createTextNode(objNode.tagname);

				child.appendChild(text);
				_memo.appendChild(child);

				if (objNode.children) {
					req(objNode.children, _deep, child);
				}
			});
			if (_deep === 0) {
				return _memo;
			}
		}

		return req(obj.children);
	}


	return toHtml;
});