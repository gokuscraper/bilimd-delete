(() => {
  const BUTTON_ID = 'bili-delete-eva3-wrapper-btn';
  const TARGET_SELECTOR = '.eva3-enhanced-image-wrapper';

  if (document.getElementById(BUTTON_ID)) {
    return;
  }

  const button = document.createElement('button');
  button.id = BUTTON_ID;
  button.type = 'button';
  button.textContent = '删除图片包裹层';

  Object.assign(button.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    zIndex: '2147483647',
    padding: '10px 14px',
    border: 'none',
    borderRadius: '10px',
    background: '#fb7299',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)'
  });

  button.addEventListener('mouseenter', () => {
    button.style.filter = 'brightness(0.95)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.filter = 'none';
  });

  function collectInRoot(root, output) {
    if (!root || !root.querySelectorAll) {
      return;
    }

    root.querySelectorAll(TARGET_SELECTOR).forEach((el) => output.add(el));

    const allElements = root.querySelectorAll('*');
    allElements.forEach((el) => {
      if (el.shadowRoot) {
        collectInRoot(el.shadowRoot, output);
      }
    });
  }

  function collectTargetsFromDocument(doc, output) {
    collectInRoot(doc, output);

    const iframes = doc.querySelectorAll('iframe');
    iframes.forEach((frame) => {
      try {
        if (frame.contentDocument) {
          collectInRoot(frame.contentDocument, output);
        }
      } catch (_) {
        // 跨域 iframe 无法访问，忽略
      }
    });
  }

  function deleteElementInEditor(el) {
    if (!el || !el.ownerDocument) {
      return false;
    }

    const doc = el.ownerDocument;
    let removed = false;

    // 1) 优先尝试点击元素内的“删除”按钮（如果编辑器有）
    const deleteBtn = el.querySelector(
      '[aria-label*="删"], [title*="删"], .delete, .remove, .icon-close, .close'
    );

    if (deleteBtn) {
      deleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      removed = !el.isConnected;
    }

    if (!removed) {
      // 2) 通过选区 + 退格键，尽量让编辑器同步内部状态
      try {
        const range = doc.createRange();
        range.selectNode(el);

        const selection = doc.getSelection ? doc.getSelection() : window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }

        const active = doc.activeElement;
        if (active && active.dispatchEvent) {
          active.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: 'Backspace',
              code: 'Backspace',
              bubbles: true,
              cancelable: true
            })
          );
        }

        if (doc.execCommand) {
          doc.execCommand('delete');
        }

        if (el.isConnected) {
          range.deleteContents();
        }
      } catch (_) {
        // ignore
      }
    }

    // 3) 最后兜底：直接删 DOM
    if (el.isConnected) {
      el.remove();
    }

    removed = !el.isConnected;

    return removed;
  }

  button.addEventListener('click', () => {
    const targets = new Set();
    collectTargetsFromDocument(document, targets);
    let removed = 0;

    targets.forEach((el) => {
      if (deleteElementInEditor(el)) {
        removed += 1;
      }
    });

    const originalText = button.textContent;
    button.textContent = removed > 0 ? `已删除 ${removed} 个` : '未找到目标元素';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  });

  document.body.appendChild(button);
})();