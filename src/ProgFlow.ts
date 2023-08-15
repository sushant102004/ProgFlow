import * as vscode from 'vscode'
import { DataStream } from './streamListener'
import { Utils } from './utils/getDetails'
import { APIHandler } from './api';
import { TimeUtils } from './utils/time';


export class ProgFlow {
    isSessionRunning = false

    ds: DataStream = new DataStream()
    utils: Utils = new Utils()
    apiHandler: APIHandler = new APIHandler()

    constructor() {
        this.ds.on('data', (chunk) => {
            if (chunk.toString() === 'Close Session') {
                this.isSessionRunning = false
            }
        })
    }


    startSession(ctx: vscode.ExtensionContext): void {

        if (!this.isSessionRunning) {
            if (this.utils.getProject() !== 'No Folder Opened') {
                this.apiHandler.addProject(ctx, this.utils.getProject())
                this.captureTime(ctx)
                this.isSessionRunning = true
                vscode.window.showInformationMessage('🔥 Coding Session Started')
                ctx.globalState.update('progflow.projectStartTime', TimeUtils.getFormattedTime())

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


    captureTime(ctx: vscode.ExtensionContext): void {
        let timeInterval = setInterval(() => {
            if (this.isSessionRunning) {

                let projectName = this.utils.getProject()
                let startTime: string = ctx.globalState.get('progflow.projectStartTime') ?? ''

                if (startTime === '') {
                    vscode.window.showErrorMessage('Unable to get start time.')
                    return
                }

                this.apiHandler.updateCodingActivity(ctx, projectName, startTime)

            } else {
                console.log('Session Stopped')
                clearInterval(timeInterval)
            }
        }, 30000)
    }
}