import * as vscode from 'vscode'

export class Utils {
    getLanguages() {
        let names: string[] = []

        const openedEditor = vscode.window.visibleTextEditors

        openedEditor.map(editor => names.push(editor.document.languageId))
        return names
    }
}