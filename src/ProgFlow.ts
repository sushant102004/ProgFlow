import * as vscode from 'vscode'
import { DataStream } from './streamListener'
import { Utils } from './utils/getDetails'
import { APIHandler } from './api';


export class ProgFlow {
    isSessionRunning = false

    ds: DataStream = new DataStream()
    utils: Utils = new Utils()

    constructor() {
        this.ds.on('data', (chunk) => {
            if (chunk.toString() === 'Close Session') {
                this.isSessionRunning = false
            }
        })
    }


    startSession(ctx: vscode.ExtensionContext): void {
        let apiHandler = new APIHandler()

        if (!this.isSessionRunning) {
            if (this.utils.getProject() !== 'No Folder Opened') {
                apiHandler.addProject(ctx, this.utils.getProject())
                this.captureTime()
                this.isSessionRunning = true
                vscode.window.showInformationMessage('🔥 Coding Session Started')
            } else {
                vscode.window.showInformationMessage('❌ Open folder to start coding session')
            }
        } else {
            vscode.window.showInformationMessage('⚠️ Session already running')
        }
    }

    closeSession(): void {
        if (!this.isSessionRunning) {
            vscode.window.showInformationMessage('⚠️ Session already closed')
            return
        }
        this.isSessionRunning = false
        vscode.window.showInformationMessage('⚠️ Session closed.')
    }

    setAPIKey(ctx: vscode.ExtensionContext): void {
        const globalState = ctx.globalState

        vscode.window.showInputBox({
            title: 'API Key',
            prompt: 'Please enter your API key',
        }).then((api) => {
            if (api) {
                globalState.update('progflow.apiKey', api)
                vscode.window.showInformationMessage('✅ API key added successfully.')

                console.log(globalState.get('progflow.apiKey'))
            } else {
                vscode.window.showErrorMessage('❌ Please enter your API key.')
            }
        })
    }


    captureTime(): void {
        let timeInterval = setInterval(() => {
            if (this.isSessionRunning) {
                // console.log(this.utils.getLanguages())
                // console.log(this.utils.getProject())
                // console.log(this.utils.getOS())
                // console.log(this.utils.getComputerName())
                // console.log(this.utils.getOpenedFiles())
            } else {
                console.log('Session Stopped')
                clearInterval(timeInterval)
            }
        }, 5000)
    }
}