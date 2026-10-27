// All page copy lives here. To add a language, copy this file (e.g. es.ts),
// translate the values, and register it in index.ts.
export const en = {
  htmlLang: 'en',
  title: 'Shortty: a free screenshot tool for macOS',
  description:
    'Capture, mark up and share in seconds. A free, open source, minimal screenshot tool for macOS. No ads, no account, no tracking.',
  hero: {
    headline: ['Screenshots,', 'minus the friction.'],
    lead: 'A free, minimal screenshot tool for macOS. Capture, mark up and share in seconds. Every feature is free, no ads, no account.',
    download: 'Download for macOS',
    install: 'How to install',
    note: 'Apple silicon · macOS 14+ · Free and open source (MIT)',
    heroAlt: 'The Shortty editor with blur, arrows, spotlight, Live Text and recent captures',
  },
  features: {
    label: 'Features',
    title: 'What you get',
    lead: 'A small app that does the screenshot job well, and gets out of the way.',
    items: [
      ['Every kind of capture', 'Region, window, screen, scrolling pages, delayed shots, or just the text and QR codes in an area, straight to the clipboard.'],
      ['An editor that never flattens', 'Arrows, text callouts, shapes, numbered steps, magnifier, blur and spotlight. Select anything later to move, resize or recolor it.'],
      ['Text Card', 'Drag over code, a terminal or a chat and get a clean window-like card, every word in its original color.'],
      ['Pick up where you left off', 'The last 20 captures keep their edits, even after a relaunch.'],
      ['Private by design', 'No account, no tracking. Text is recognized on-device with Apple Vision and Live Text; nothing leaves your Mac.'],
      ['Native and light', 'Swift, SwiftUI and AppKit, no third-party dependencies. Lives in the menu bar.'],
    ],
  },
  gallery: {
    label: 'Layouts',
    title: 'Make the editor yours',
    lead: 'Pick the toolbar layout that fits how you work. Shortcuts, colors and behavior are customizable too.',
    layouts: ['Classic', 'Two rows', 'Sidebars', 'Canvas first'],
    altPrefix: 'The editor layout:',
  },
  install: {
    label: 'Install',
    title: 'How to install',
    lead: "Shortty is free, so it isn't signed with a paid Apple Developer ID. macOS will warn you the first time; it takes one extra click to open. There are two ways in.",
    option1: 'Option 1: download the app',
    steps: [
      'Download the latest <code>Shortty-X.Y.Z.dmg</code> from <a href="{releases}">GitHub Releases</a>.',
      'Open it and drag <strong>Shortty</strong> onto <strong>Applications</strong>.',
      "Open Shortty. macOS says it can't verify the developer: close that message (don't move it to the Trash).",
      'Open <strong>System Settings → Privacy &amp; Security</strong>, scroll to Security and click <strong>Open Anyway</strong> next to "Shortty was blocked". Confirm with Touch ID or your password. Only needed once.',
      'Take a capture. macOS asks for <strong>Screen Recording</strong>: allow Shortty, and reopen it if asked.',
      'Set your shortcuts in Settings → Shortcuts. None are set out of the box.',
    ],
    terminalNote: 'Prefer the terminal for step 4? This removes the "downloaded from the internet" flag instead:',
    update: 'To update, drag the new version over the old one. Screen Recording stays allowed.',
    option2: 'Option 2: build it yourself',
    build:
      'No Apple account and no warning, because apps you build are not flagged as downloaded. You need Xcode (free) and <a href="https://github.com/yonaskolb/XcodeGen">xcodegen</a>.',
    buildUpdate: 'To update later:',
  },
  footer: {
    license: 'Shortty is free and open source under the',
    licenseLink: 'MIT license',
    source: 'Source on GitHub',
    issues: 'Report an issue',
  },
};

export type Messages = typeof en;
