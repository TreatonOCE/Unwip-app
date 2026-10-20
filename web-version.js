window.UNWIP_VERSION = "0.45.9";
window.UNWIP_LATEST_NOTES = "- Import room: for a list, \"One page per person\" and \"Keep it as one document\" are now a switch. Picking one only picks it, and the preview below shows what you'll get: each page, or the document as one page. Switch as often as you like. The pages are made when you move on.\n- Import room: every page made from a list says which list it came from, with \"Change back to one document\" to undo it.\n- Import room: on the last document of a step, Next document goes on to the next step instead of being greyed out.\n- Import room: a list of people written on separate lines of one paragraph (common from Scrivener) is found as a list, with the one-page-per-person choice and its preview.\n- Import room: a notes page named after a game term (like \"Danger Rating\") is no longer guessed to be a person, and lines that are a whole [system message] aren't read as people's names.";
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
      const go = async () => { try { await U.flushSave(); if (U.saveMetaNow) await U.saveMetaNow(); } catch (e) {} if (U.saveFailing) { U.toast('Unwip can’t update yet: some writing isn’t saved (the bar at the top says why). It updates once saving works again.', 'warn', 9000); offered = ''; return; } location.reload(); };
      if (window.UnwipUpdates && window.UnwipUpdates.notice) window.UnwipUpdates.notice({ title: 'A new version of Unwip is ready', version: v, notes, action: 'Update now', run: go });
      else U.toastAction('A new version of Unwip is ready (' + v + ').', 'Update now', go, 60000);
    } catch (e) {}
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  addEventListener('load', () => setTimeout(check, 20000)); setInterval(check, 3600000);
})();
