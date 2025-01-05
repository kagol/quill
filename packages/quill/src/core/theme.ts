import type Quill from '../core.js';
import type Clipboard from '../modules/clipboard.js';
import type History from '../modules/history.js';
import type Keyboard from '../modules/keyboard.js';
import type { ToolbarProps } from '../modules/toolbar.js';
import type Uploader from '../modules/uploader.js';

export interface ThemeOptions {
  modules: Record<string, unknown> & {
    toolbar?: null | ToolbarProps;
  };
}

class Theme {
  static DEFAULTS: ThemeOptions = {
    modules: {},
  };

  static themes = {
    default: Theme,
  };

  modules: ThemeOptions['modules'] = {};

  constructor(
    protected quill: Quill,
    protected options: ThemeOptions,
  ) {}

  init() {
    // 循环所有模块，并初始化
    Object.keys(this.options.modules).forEach((name) => {
      if (this.modules[name] == null) {
        this.addModule(name);
      }
    });
  }

  addModule(name: 'clipboard'): Clipboard;
  addModule(name: 'keyboard'): Keyboard;
  addModule(name: 'uploader'): Uploader;
  addModule(name: 'history'): History;
  addModule(name: string): unknown;
  addModule(name: string) {
    // @ts-expect-error
    // 调用 Quill.import 导入模块
    const ModuleClass = this.quill.constructor.import(`modules/${name}`);
    // 初始化模块
    this.modules[name] = new ModuleClass(
      this.quill,
      this.options.modules[name] || {},
    );
    return this.modules[name];
  }
}

export interface ThemeConstructor {
  new (quill: Quill, options: unknown): Theme;
  DEFAULTS: ThemeOptions;
}

export default Theme;
