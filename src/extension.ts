import * as vscode from 'vscode'

/* This method is called when your extension is activated. Your extension is activated the very first time the command is executed */

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "progflow" is now active!')

	let disposable = vscode.commands.registerCommand('progflow.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from ProgFlow!');
	});

	context.subscriptions.push(disposable)
}

export function deactivate() {}
