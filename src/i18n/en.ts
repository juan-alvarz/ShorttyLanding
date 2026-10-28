// All page copy lives here. To add a language, copy this file (e.g. es.ts),
// translate the values, and register it in index.ts.
export const en = {
  htmlLang: 'en',
  title: 'Shortty, a free screenshot tool for macOS',
  description:
    'Capture any part of your screen, mark it up and share it. Free and open source, no account, no ads, no tracking.',

  nav: {
    capture: 'Capture',
    edit: 'Edit',
    layouts: 'Layouts',
    install: 'Install',
    releases: 'Releases',
    github: 'GitHub',
    label: 'Sections',
    download: 'Download',
  },

  hero: {
    // The middle line gets a selection frame around it.
    headline: ['Point.', 'Drag.', 'Done.'],
    lead: 'Shortty is a free screenshot tool for macOS. Grab any part of the screen, mark it up without flattening a thing, and send it on its way.',
    download: 'Download for Mac',
    install: 'How to install',
    hint: 'Drag anywhere up here to try a selection',
    tryIt: 'Now do it for real',
    shotAlt: 'The Shortty editor: blur, arrows, a spotlight, Live Text and the recent captures bar on a screenshot of a GitHub page',
    shotLabel: 'editor · classic layout',
  },

  specs: ['macOS 14+', 'Apple silicon', 'Swift 6', '0 dependencies', 'MIT license', 'No account', 'No ads', 'No tracking'],

  capture: {
    label: 'Capture',
    title: 'Ten ways to grab the screen.',
    lead: 'Everything lives in the menu bar, and every action can have its own global shortcut. You pick them; none are set out of the box.',
    items: [
      ['Region', 'Drag over an area. Space switches to clicking a window.'],
      ['Repeat last region', 'The same area as last time, remembered across relaunches.'],
      ['Screen', 'The display under the pointer.'],
      ['Window', 'Click a window to capture it, without its shadow.'],
      ['Active window', 'The front window of the app you are in, instantly.'],
      ['Scrolling', 'Scroll a page and the frames are stitched into one tall image.'],
      ['Text', 'The text or QR code in an area goes straight to the clipboard.'],
      ['Lazy region', 'Pick the area, then a countdown runs before the shot.'],
      ['Lazy screen', 'A countdown, then the display under the pointer.'],
      ['Reopen last', 'Brings back the latest capture with its edits, even after a relaunch.'],
    ],
  },

  edit: {
    label: 'Edit',
    title: 'Nothing gets flattened.',
    lead: 'Every arrow, label and blur stays an object. Select it later to move it, resize it or change its color. Hold ⌘ in the editor to see each key.',
    tools: [
      ['V', 'Select', 'Move, resize, recolor anything you drew.'],
      ['P', 'Pencil', 'Freehand. Shift for a straight line.'],
      ['A', 'Arrow', 'Four styles, curve it from the middle.'],
      ['T', 'Text', 'Callout, label or plain letters.'],
      ['R O', 'Shapes', 'Rectangle or ellipse. Shift makes it a square or a circle.'],
      ['N', 'Steps', '1, 2, 3 badges that renumber themselves.'],
      ['M', 'Magnifier', 'A 2× copy of a small area, joined by a line.'],
      ['B', 'Blur', 'Blur or erase an area, or only its text.'],
      ['S', 'Spotlight', 'Dims everything else.'],
      ['X', 'Recognize text', 'Live Text: select exactly the words you want.'],
      ['K', 'Text Card', 'Code or a chat, redrawn as a clean card.'],
      ['C', 'Crop', 'Undo brings the whole picture back.'],
      ['U', 'Ruler', 'Measure to the nearest edges, in pixels.'],
    ],
  },

  extras: {
    label: 'And also',
    title: 'The small things that add up.',
    items: [
      ['Text Card', 'Drag over code, a terminal or a chat and it is redrawn as a window-like card, every word in the color it had. Syntax highlighting survives.'],
      ['Ruler', 'Point at anything to measure it. Lines run to the nearest edges with their length in pixels; hold 1 or 2 to measure one way.'],
      ['Quick card', 'Skip the editor when you want: a small card in the corner offers Copy, Save, Pin and Edit, then goes away on its own.'],
      ['Recent captures', 'The last 20 captures keep their edits, even after a relaunch. Click one to keep working on it.'],
      ['Drag and drop', 'Drag the finished picture into any app or upload box. Nothing piles up in Downloads.'],
      ['Pin to screen', 'Float a capture above every window while you work from it.'],
      ['Gradient backdrop', 'Put the result on a gradient card with padding and a soft shadow, ready to post.'],
      ['Room to work', 'Draw or type past the edges of the screenshot and the canvas grows to fit.'],
      ['Private', 'Text is recognized on your Mac with Apple Vision and Live Text. Nothing leaves it.'],
    ],
  },

  layouts: {
    label: 'Layouts',
    title: 'Four ways to arrange the editor.',
    lead: 'Settings → General → Layout. Switch any time; an open editor follows.',
    items: [
      ['Classic', 'One toolbar with everything. Tool options float at the top right of the picture.'],
      ['Two rows', 'The toolbar, then a strip with the current tool’s options, colors, size and zoom. Nothing covers the picture.'],
      ['Sidebars', 'Tools in a column on the left; options, colors and backdrop on the right.'],
      ['Canvas first', 'The picture fills the window. Tools sit in a floating dock at the bottom.'],
    ],
  },

  install: {
    label: 'Install',
    title: 'Get Shortty.',
    lead: 'Shortty is free, so it isn’t signed with a paid Apple Developer ID ($99 a year). macOS asks you to confirm it once. That’s the only catch.',
    download: {
      title: 'Download the app',
      steps: [
        'Download the latest <code>Shortty-X.Y.Z.dmg</code> from <a href="{releases}">GitHub Releases</a>.',
        'Open it and drag <strong>Shortty</strong> onto <strong>Applications</strong>.',
        'Open Shortty. macOS says it can’t verify the developer: close that message. Don’t move it to the Trash.',
        'Go to <strong>System Settings → Privacy &amp; Security</strong>, scroll to Security and click <strong>Open Anyway</strong> next to “Shortty was blocked”. Confirm with Touch ID or your password.',
        'Take a capture. When macOS asks for <strong>Screen Recording</strong>, allow Shortty and reopen it if asked.',
        'Set your shortcuts in Settings → Shortcuts.',
      ],
      terminal: 'Or skip step 4 from the terminal:',
      update: 'To update, drag the new version over the old one. Screen Recording stays allowed.',
    },
    build: {
      title: 'Or build it yourself',
      text: 'No Apple account and no warning: apps you build yourself aren’t flagged as downloaded. You need Xcode (free) and <a href="https://github.com/yonaskolb/XcodeGen">xcodegen</a>.',
      update: 'To update later:',
    },
    copy: 'Copy',
    copied: 'Copied',
  },

  releases: {
    label: 'Releases',
    title: 'What’s new.',
    lead: 'The latest versions, with their notes from GitHub.',
    latest: 'Latest',
    prerelease: 'Pre-release',
    download: 'Download',
    onGitHub: 'Release on GitHub',
    all: 'All releases',
  },

  footer: {
    tagline: 'A free screenshot tool for macOS.',
    license: 'Free and open source under the MIT license.',
    source: 'Source',
    releases: 'Releases',
    issues: 'Issues',
    support: 'Support',
    supportNote: 'Free for everyone. Coffee optional.',
  },
};

export type Messages = typeof en;
