import * as vscode from 'vscode'
import { ProgFlow } from './ProgFlow';

export function activate(ctx: vscode.ExtensionContext) {
	let progFlow = new ProgFlow()

	progFlow.startSession(ctx)

	let newSession = vscode.commands.registerCommand('progflow.startSession', () => {
		progFlow.startSession(ctx)
	})
	ctx.subscriptions.push(newSession)


	let closeSession = vscode.commands.registerCommand('progflow.closeSession', () => {
		progFlow.ds.addData('Close Session')
	})

	let setAPIKey = vscode.commands.registerCommand('progflow.setAPIKey', () => {
		progFlow.setAPIKey(ctx)
	})


	ctx.subscriptions.pop()
	ctx.subscriptions.push(closeSession)

}

export function deactivate() {
	let progFlow = new ProgFlow()
	progFlow.closeSession()
}