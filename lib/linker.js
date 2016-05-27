'use babel';

import LinkerView from './linker-view';
import { CompositeDisposable } from 'atom';

export default {

  linkerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linkerView = new LinkerView(state.linkerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linkerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'linker:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linkerView.destroy();
  },

  serialize() {
    return {
      linkerViewState: this.linkerView.serialize()
    };
  },

  toggle() {
    console.log('Linker was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
