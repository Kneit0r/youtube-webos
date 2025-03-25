import 'whatwg-fetch';
import './domrect-polyfill';

import { handleLaunch } from './utils';

document.addEventListener(
  'webOSRelaunch',
  (evt) => {
    console.info('RELAUNCH:', evt, window.launchParams);
    handleLaunch(evt.detail);
  },
  true
);

import './adblock.js';
import './shorts.js';
import './sponsorblock.js';
import './ui.js';
import './font-fix.css';
import './thumbnail-quality';
import './screensaver-fix';
import './yt-fixes.css';
import './zoom.js';

(function () {
  'use strict';

  // Function to apply or remove darkening based on URL hash
  function updateDarkening() {
    const isHomepage = window.location.hash === '#/';
    let style = document.getElementById('darken-style');

    // If on homepage, add or update the style
    if (isHomepage) {
      if (!style) {
        style = document.createElement('style');
        style.id = 'darken-style';
        style.textContent = `
          html, body {
            filter: brightness(70%);
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .ytlr-guide-entry,
          .ytlr-header,
          .ytlr-footer {
            filter: brightness(40%);
          }
        `;
        document.head.appendChild(style);
      }
    }
    // If on watch page (or elsewhere), remove the style
    else if (style) {
      style.remove();
    }
  }

  // Run initially after the app loads
  window.addEventListener('load', function () {
    updateDarkening();
  });

  // Listen for hash changes (app uses hash routing)
  window.addEventListener('hashchange', updateDarkening);
})();

// Clean up homepage

(function () {
  'use strict';

  // Inject CSS rules
  const style = document.createElement('style');
  style.textContent = `
      /* Block the top shelf nudge renderer */
      .zylon-ve.ytLrSectionListRendererContents-item-1.zylon-focus.ytLrFeedNudgeRendererFocused.ytLrFeedNudgeRendererHost.ytLrFeedNudgeRendererLeftAligned.ytLrFeedNudgeRendererAccentGradientBackgroundStyle {
          display: none !important;
      }
  `;
  document.head.appendChild(style);
})();

(function () {
  'use strict';

  // Inject CSS rule for ytLrFeedNudgeRendererContainer
  const style = document.createElement('style');
  style.textContent = `
      .ytLrFeedNudgeRendererContainer {
          display: none !important;
      }
  `;
  document.head.appendChild(style);
})();
