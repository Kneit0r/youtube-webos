/* eslint no-redeclare: 0 */
/* global fetch:writable */
import { configRead } from './config';

const origParse = JSON.parse;
JSON.parse = function () {
  const r = origParse.apply(this, arguments);
  if (!configRead('removeShorts')) {
    return r;
  }

  // Remove shorts from section lists (rows)
  const sectionListRenderer = findFirstObject(r, 'sectionListRenderer');
  if (sectionListRenderer?.contents) {
    removeShortsSection(sectionListRenderer);
  }
  
  // First page of subscriptions tab
  const gridRenderer = findFirstObject(r, 'gridRenderer');
  if (gridRenderer?.items) {
    removeShorts(gridRenderer);
  }

  // Pagination
  const gridContinuation = findFirstObject(r, 'gridContinuation');
  if (gridContinuation?.items) {
    removeShorts(gridContinuation);
  }

  return r;
};

function removeShorts(container) {
  container.items = container.items.filter(
    (elm) => elm?.tileRenderer?.onSelectCommand?.reelWatchEndpoint == null
  );
}

function removeShortsSection(sectionList) {
  sectionList.contents = sectionList.contents.filter(
    (elm) =>
      elm?.shelfRenderer?.tvhtml5ShelfRendererType !==
      'TVHTML5_SHELF_RENDERER_TYPE_SHORTS'
  );
}

function findFirstObject(haystack, needle) {
  for (const key in haystack) {
    if (key === needle) {
      return haystack[key];
    }
    if (typeof haystack[key] === 'object') {
      const result = findFirstObject(haystack[key], needle);
      if (result) return result;
    }
  }
  return null;
}
