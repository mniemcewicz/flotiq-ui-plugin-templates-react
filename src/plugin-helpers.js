const appRoots = {}

export const onElementRemoved = (element, callback) => {
  new MutationObserver(function() {
    if(!element.parentElement) {
      callback();
      this.disconnect();
    }
  }).observe(element.parentElement, {childList: true});
}

export const addElementToCache = (element, root, key) => {
  appRoots[key] = {
    element,
    root
  };

  setTimeout(() => {
    onElementRemoved(element, () => delete appRoots[key]);
  }, 1)
}

export const getCachedElement = (key) => {
  return appRoots[key];
}

export const registerFn = (pluginInfo, callback) => {
  if (window.FlotiqPlugins?.add) {
    window.FlotiqPlugins.add(pluginInfo, callback);
    return;
  }
  if (!window.initFlotiqPlugins) window.initFlotiqPlugins = [];
  window.initFlotiqPlugins.push({ pluginInfo, callback });
};