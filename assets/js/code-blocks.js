document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.post-content div.highlighter-rouge').forEach(function (block) {
    var langClass = Array.prototype.find.call(block.classList, function (c) {
      return c.indexOf('language-') === 0;
    });
    var lang = langClass ? langClass.replace('language-', '') : '';

    var toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    var label = document.createElement('span');
    label.className = 'code-lang';
    label.textContent = lang && lang !== 'plaintext' ? lang : 'text';
    toolbar.appendChild(label);

    if (navigator.clipboard && window.isSecureContext) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code');
      toolbar.appendChild(button);

      button.addEventListener('click', function () {
        var code = block.querySelector('pre code');
        if (!code) return;
        navigator.clipboard.writeText(code.innerText).then(function () {
          button.textContent = 'Copied!';
          button.disabled = true;
          setTimeout(function () {
            button.textContent = 'Copy';
            button.disabled = false;
          }, 2000);
        }).catch(function () {
          button.textContent = 'Copy failed';
          setTimeout(function () {
            button.textContent = 'Copy';
          }, 2000);
        });
      });
    }

    block.insertBefore(toolbar, block.firstChild);
  });
});
