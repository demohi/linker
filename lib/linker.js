'use babel'

/*global atom*/

import { CompositeDisposable } from 'atom'
import {shell} from 'electron'
import {basename} from 'path'

export default {

  subscriptions: null,

  activate (state) {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'linker:open': () => this.open('http://baidu.com')
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
  },

  open (link) {
    const editor = atom.workspace.getActiveTextEditor()
    if (!editor) return
    const baseName = basename(editor.getPath())
    const cursorPosition = editor.getCursorBufferPosition()
    console.log(baseName)
    console.log(cursorPosition)
    console.log(editor.getBuffer())
    console.log(editor.selectLine())
    // shell.openExternal(link)
  }

}
