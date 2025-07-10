// Palettes with extended window color vars
const palettes = {
  default: {
    bg: '#fce4eccc',
    windowBg: '#fff8ff',
    windowBorder: '#660066',
    text: '#330033',
    highlight: '#ff00ff',
    windowContentBg: '#fff0f9',
    titlebarBgStart: '#ffccff',
    titlebarBgEnd: '#ffe6ff',
    closeBtnBg: '#ffaaaa',
    closeBtnHoverBg: '#ff6666',
  },
  green: {
    bg: '#e0f7e9cc',
    windowBg: '#f0fff8',
    windowBorder: '#006633',
    text: '#004422',
    highlight: '#00cc44',
    windowContentBg: '#e6fff4',
    titlebarBgStart: '#a3d9b3',
    titlebarBgEnd: '#c6f1d6',
    closeBtnBg: '#88d88c',
    closeBtnHoverBg: '#44b844',
  },
  blue: {
    bg: '#e0f0ffcc',
    windowBg: '#f0f8ff',
    windowBorder: '#004466',
    text: '#002244',
    highlight: '#0099ff',
    windowContentBg: '#e6f0ff',
    titlebarBgStart: '#a3c3f9',
    titlebarBgEnd: '#c6dbff',
    closeBtnBg: '#88aadd',
    closeBtnHoverBg: '#4477cc',
  },
  dark: {
    bg: '#220022cc',
    windowBg: '#330033',
    windowBorder: '#bb00bb',
    text: '#ffccff',
    highlight: '#ff66ff',
    windowContentBg: '#440044',
    titlebarBgStart: '#bb55bb',
    titlebarBgEnd: '#dd88dd',
    closeBtnBg: '#cc44cc',
    closeBtnHoverBg: '#bb00bb',
  }
};

function setPalette(colors) {
  const root = document.documentElement.style;
  root.setProperty('--bg-color', colors.bg);
  root.setProperty('--window-bg', colors.windowBg);
  root.setProperty('--window-border', colors.windowBorder);
  root.setProperty('--text-color', colors.text);
  root.setProperty('--highlight-color', colors.highlight);

  root.setProperty('--window-content-bg', colors.windowContentBg);
  root.setProperty('--titlebar-bg-start', colors.titlebarBgStart);
  root.setProperty('--titlebar-bg-end', colors.titlebarBgEnd);
  root.setProperty('--close-btn-bg', colors.closeBtnBg);
  root.setProperty('--close-btn-hover-bg', colors.closeBtnHoverBg);
}

// Insert dropdown to select palette
const selector = document.createElement('select');
selector.id = 'palette-select';
selector.style.cssText = `
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 10000;
  background: white;
  color: black;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  border-radius: 6px;
  border: 1px solid #660066;
  padding: 4px 8px;
  cursor: pointer;
`;

for (const key in palettes) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  selector.appendChild(option);
}

document.body.appendChild(selector);

// Set default palette on load
setPalette(palettes.default);

selector.addEventListener('change', () => {
  setPalette(palettes[selector.value]);
});
