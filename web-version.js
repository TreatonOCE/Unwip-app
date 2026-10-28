window.UNWIP_VERSION = "0.47.0";
window.UNWIP_LATEST_NOTES = "- iPad: bold, italic and underline are always on the toolbar now. When space is short, the font box gets narrower instead, and the full font name still shows when you open it.\n- iPad with a keyboard attached: the iPad's own floating bar at the bottom no longer covers the word count, zoom and Record while you type.\n- Import: lists you don't choose for stay as one document. Only the lists where you pick \"One page per \u2026\" are turned into pages, however you move on.\n- Import: pages made from a list are no longer walked through one by one. Next goes past them, and the counter only counts the documents you brought in.\n- Deleting a book while Dropbox is busy with its folder: Unwip waits a few seconds and tries again. If it still can't, it says so plainly and leaves the book as it was, instead of a technical error.\n- PC: typing no longer jitters every few seconds while Unwip saves. While you keep typing, only the chapter is saved, and the save no longer holds up the window. The rest of the book is saved when you pause.\n- Rename a book from the main screen: open its \u22ef menu and choose Rename\u2026\n- Scrivener import: statuses now take the colour of the label their chapters carry in Scrivener, so \"Amazon Ready\" comes in gold.\n- PC: the scene break button stays on the toolbar unless the window is very narrow.";
if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
(function () {
  if (location.protocol !== 'https:') return;
  let last = 0, offered = '';
  async function check() {
    if (Date.now() - last < 60000) return; last = Date.now();
    try {
      const t = await (await fetch('web-version.js?v=' + Date.now(), { cache: 'no-store' })).text();
      const m = t.match(/UNWIP_VERSION = "([^"]+)"/); const v = m && m[1];
      const U = window.__unwip; if (!v || v === window.UNWIP_VERSION || v === offered || !U || !U.toastAction) return;
      offered = v;
      let notes = ''; try { const n = t.match(/UNWIP_LATEST_NOTES = ("(?:[^"\\]|\\.)*");/); if (n) notes = JSON.parse(n[1]); } catch (e) {}
      const go = () => U.safeRestart ? U.safeRestart(() => location.reload()) : location.reload();
      if (window.UnwipUpdates && window.UnwipUpdates.notice) window.UnwipUpdates.notice({ title: 'A new version of Unwip is ready', version: v, notes, action: 'Update now', run: go });
      else U.toastAction('A new version of Unwip is ready (' + v + ').', 'Update now', go, 60000);
    } catch (e) {}
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  addEventListener('load', () => setTimeout(check, 20000)); setInterval(check, 3600000);
})();
