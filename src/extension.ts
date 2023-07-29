import * as vscode from 'vscode'
import { ProgFlow } from './ProgFlow';

export function activate(ctx: vscode.ExtensionContext) {
	let progFlow = new ProgFlow()
	let newSession = vscode.commands.registerCommand('progflow.startSession', () => {
		progFlow.startSession(ctx)
	});
	ctx.subscriptions.push(newSession)
}



export function deactivate() { }