# Mobgate Tests

This folder contains testing files for the Mobgate bookmarklet.

## Files

- **index.html** - Interactive test page to inject and test the bookmarklet
- **README.md** - This file

## How to Test

### Local Testing
1. Open `index.html` in a web browser
2. Click "Inject Bookmarklet" to load the GUI
3. Test the features listed on the page

### Test Checklist
- [ ] UI loads with neon cyan colors (not white)
- [ ] Password input shows readable bullet points
- [ ] "Initialize Sequence" button styled correctly
- [ ] Animations are smooth and not excessive
- [ ] Login with password: `boisotuff`
- [ ] Dashboard loads with cards in grid
- [ ] Cards respond to hover with cyan glow
- [ ] Control buttons (collapse, fullscreen, close) work
- [ ] Fonts render as modern (Space Grotesk, IBM Plex Mono)
- [ ] Dark background with cyan/purple accents
- [ ] Responsive on mobile (768px breakpoint)
- [ ] iframe opens when clicking cards
- [ ] URL toggle button hides/shows URL bar
- [ ] Close button (red) closes iframe
- [ ] ESC key closes iframe

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## Known Limitations

- Web fonts require internet connection (CDN)
- iframe content varies by card (external domains)
- Bookmarklet loads from CDN (requires internet)
