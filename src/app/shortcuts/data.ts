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
];

export const osOptions = ['All', 'Windows', 'macOS', 'Linux'];
export const appOptions = ['All', 'General', 'VS Code', 'Chrome', 'Firefox'];
