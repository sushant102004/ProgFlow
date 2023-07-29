import * as vscode from 'vscode'

export class ProgFlow {
    isSessionStarted = false
    fileCreateSub: vscode.Disposable | undefined

    startSession(ctx: vscode.ExtensionContext): void {
        if(this.isSessionStarted) {
            vscode.window.showInformationMessage('⚠️ Session is already active')
            return
        }

        this.isSessionStarted = true
        vscode.window.showInformationMessage('🔥 Coding Session Started')
    }
}