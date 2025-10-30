export type Shortcut = {
  id: string;
  os: 'Windows' | 'macOS' | 'Linux';
  app: string;
  category: string;
  description: string;
  keys: string[];
};

export const shortcuts: Shortcut[] = [
  { id: '1', os: 'Windows', app: 'General', category: 'General', description: 'Copy selected item', keys: ['Ctrl', 'C'] },
  { id: '2', os: 'Windows', app: 'General', category: 'General', description: 'Paste content', keys: ['Ctrl', 'V'] },
  { id: '3', os: 'Windows', app: 'General', category: 'General', description: 'Cut selected item', keys: ['Ctrl', 'X'] },
  { id: '4', os: 'Windows', app: 'General', category: 'General', description: 'Undo action', keys: ['Ctrl', 'Z'] },
  { id: '5', os: 'Windows', app: 'General', category: 'Files', description: 'Save file', keys: ['Ctrl', 'S'] },
  { id: '6', os: 'macOS', app: 'General', category: 'General', description: 'Copy selected item', keys: ['Cmd', 'C'] },
  { id: '7', os: 'macOS', app: 'General', category: 'General', description: 'Paste content', keys: ['Cmd', 'V'] },
  { id: '8', os: 'macOS', app: 'General', category: 'General', description: 'Cut selected item', keys: ['Cmd', 'X'] },
  { id: '9', os: 'macOS', app: 'General', category: 'General', description: 'Undo action', keys: ['Cmd', 'Z'] },
  { id: '10', os: 'macOS', app: 'General', category: 'Files', description: 'Save file', keys: ['Cmd', 'S'] },
  { id: '11', os: 'Linux', app: 'General', category: 'General', description: 'Copy selected item', keys: ['Ctrl', 'C'] },
  { id: '12', os: 'Linux', app: 'General', category: 'General', description: 'Paste content', keys: ['Ctrl', 'V'] },
  { id: '13', os: 'Windows', app: 'VS Code', category: 'Editing', description: 'Toggle line comment', keys: ['Ctrl', '/'] },
  { id: '14', os: 'macOS', app: 'VS Code', category: 'Editing', description: 'Toggle line comment', keys: ['Cmd', '/'] },
  { id: '15', os: 'Linux', app: 'VS Code', category: 'Editing', description: 'Toggle line comment', keys: ['Ctrl', '/'] },
  { id: '16', os: 'Windows', app: 'VS Code', category: 'Navigation', description: 'Go to file', keys: ['Ctrl', 'P'] },
  { id: '17', os: 'macOS', app: 'VS Code', category: 'Navigation', description: 'Go to file', keys: ['Cmd', 'P'] },
  { id: '18', os: 'Windows', app: 'Chrome', category: 'Tabs', description: 'Open new tab', keys: ['Ctrl', 'T'] },
  { id: '19', os: 'macOS', app: 'Chrome', category: 'Tabs', description: 'Open new tab', keys: ['Cmd', 'T'] },
  { id: '20', os: 'Windows', app: 'Chrome', category: 'Tabs', description: 'Close current tab', keys: ['Ctrl', 'W'] },
  { id: '21', os: 'macOS', app: 'Chrome', category: 'Tabs', description: 'Close current tab', keys: ['Cmd', 'W'] },
  { id: '22', os: 'Windows', app: 'Firefox', category: 'Tabs', description: 'Reopen closed tab', keys: ['Ctrl', 'Shift', 'T'] },
  { id: '23', os: 'macOS', app: 'Firefox', category: 'Tabs', description: 'Reopen closed tab', keys: ['Cmd', 'Shift', 'T'] },
  { id: '24', os: 'macOS', app: 'Figma', category: 'Tools', description: 'Move tool', keys: ['V'] },
  { id: '25', os: 'Windows', app: 'Figma', category: 'Tools', description: 'Frame tool', keys: ['F'] },
  { id: '26', os: 'macOS', app: 'Figma', category: 'Tools', description: 'Pen tool', keys: ['P'] },
  { id: '27', os: 'Windows', app: 'Figma', category: 'Tools', description: 'Text tool', keys: ['T'] },
  { id: '28', os: 'macOS', app: 'Figma', category: 'Zoom', description: 'Zoom in', keys: ['+'] },
  { id: '29', os: 'Windows', app: 'Figma', category: 'Zoom', description: 'Zoom out', keys: ['-'] },
  { id: '30', os: 'macOS', app: 'Figma', category: 'Grouping', description: 'Group selection', keys: ['Cmd', 'G'] },
  { id: '31', os: 'Windows', app: 'Slack', category: 'Navigation', description: 'Jump to a conversation', keys: ['Ctrl', 'K'] },
  { id: '32', os: 'macOS', app: 'Slack', category: 'Navigation', description: 'Jump to a conversation', keys: ['Cmd', 'K'] },
  { id: '33', os: 'Windows', app: 'Slack', category: 'Messaging', description: 'Edit last message', keys: ['Up Arrow'] },
  { id: '34', os: 'macOS', app: 'Slack', category: 'Messaging', description: 'Mark messages as unread', keys: ['Alt', 'Click'] },
  { id: '35', os: 'Windows', app: 'Slack', category: 'General', description: 'Toggle full screen view', keys: ['F11'] },
  { id: '36', os: 'macOS', app: 'Slack', category: 'General', description: 'Show all unreads', keys: ['Cmd', 'Shift', 'A'] },
  { id: '37', os: 'Windows', app: 'General', category: 'General', description: 'Redo action', keys: ['Ctrl', 'Y'] },
  { id: '38', os: 'macOS', app: 'General', category: 'General', description: 'Redo action', keys: ['Cmd', 'Shift', 'Z'] },
  { id: '39', os: 'Windows', app: 'General', category: 'General', description: 'Select all', keys: ['Ctrl', 'A'] },
  { id: '40', os: 'macOS', app: 'General', category: 'General', description: 'Select all', keys: ['Cmd', 'A'] },
  { id: '41', os: 'Windows', app: 'General', category: 'Navigation', description: 'Switch between open apps', keys: ['Alt', 'Tab'] },
  { id: '42', os: 'macOS', app: 'General', category: 'Navigation', description: 'Switch between open apps', keys: ['Cmd', 'Tab'] },
  { id: '43', os: 'Windows', app: 'VS Code', category: 'Editing', description: 'Duplicate line', keys: ['Alt', 'Shift', 'Down'] },
  { id: '44', os: 'macOS', app: 'VS Code', category: 'Editing', description: 'Duplicate line', keys: ['Option', 'Shift', 'Down'] },
  { id: '45', os: 'Windows', app: 'VS Code', category: 'Command Palette', description: 'Show command palette', keys: ['Ctrl', 'Shift', 'P'] },
  { id: '46', os: 'macOS', app: 'VS Code', category: 'Command Palette', description: 'Show command palette', keys: ['Cmd', 'Shift', 'P'] },
  { id: '47', os: 'Windows', app: 'Chrome', category: 'Navigation', description: 'Go to address bar', keys: ['Ctrl', 'L'] },
  { id: '48', os: 'macOS', app: 'Chrome', category: 'Navigation', description: 'Go to address bar', keys: ['Cmd', 'L'] },
  { id: '49', os: 'Windows', app: 'Chrome', category: 'Tabs', description: 'Switch to next tab', keys: ['Ctrl', 'Tab'] },
  { id: '50', os: 'macOS', app: 'Chrome', category: 'Tabs', description: 'Switch to next tab', keys: ['Cmd', 'Option', 'Right'] },
  { id: '51', os: 'Windows', app: 'Figma', category: 'Zoom', description: 'Zoom to fit', keys: ['Shift', '1'] },
  { id: '52', os: 'macOS', app: 'Figma', category: 'Zoom', description: 'Zoom to fit', keys: ['Shift', '1'] },
  { id: '53', os: 'Windows', app: 'Slack', category: 'Messaging', description: 'React to message', keys: ['Ctrl', 'Shift', '\\'] },
  { id: '54', os: 'macOS', app: 'Slack', category: 'Messaging', description: 'React to message', keys: ['Cmd', 'Shift', '\\'] },
  { id: '55', os: 'Windows', app: 'Notion', category: 'Formatting', description: 'Create a toggle list', keys: ['>', 'Space'] },
  { id: '56', os: 'macOS', app: 'Notion', category: 'Formatting', description: 'Create a to-do list', keys: ['[]'] },
];

export const osOptions = ['All', 'Windows', 'macOS', 'Linux'];
export const appOptions = ['All', 'General', 'VS Code', 'Chrome', 'Firefox', 'Figma', 'Slack', 'Notion'];
