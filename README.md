# Cozy Retro Desktop Website

This project is a personal website designed to replicate the look and feel of a late 1990s to early 2000s desktop environment. It combines classic desktop UI elements with web technologies to create an interactive, nostalgic user experience.

---

## Features

- **Retro desktop interface** modeled after Windows 95-style desktops.
- Multiple **color palettes** for customizing the look and feel.
- Interactive **desktop icons** that open draggable windows.
- Custom **pixelated mouse cursor** that stays visible above all UI elements.
- Windows include animated transitions and styled title bars with close buttons.
- Visual effects such as flickering overlays and CRT scanlines to enhance the vintage feel.
- Responsive design optimized for modern browsers.

---

## Usage

Open the `index.html` file in any modern web browser to launch the desktop interface. Use the palette selector located at the bottom-left corner to switch between color themes. Click icons on the desktop to open corresponding windows, which can be dragged around and closed.

---

## Customization

- The color scheme is controlled via CSS variables defined in the `:root` selector.
- Additional color palettes can be added in the JavaScript `palettes` object.
- The custom cursor and window styles can be adjusted in the CSS files.

---

## Development Details

- Uses CSS custom properties and JavaScript to enable dynamic theme switching.
- The custom cursor is implemented as a fixed-position DOM element with high z-index.
- Windows and UI elements are styled with CSS transitions for smooth animations.
- The layout uses a fixed-size desktop container centered on the page.

---

## Contributing

Suggestions and improvements are welcome. Please submit issues or pull requests for bug fixes, feature additions, or enhancements.

---

## License

This project is licensed under the MIT License.
