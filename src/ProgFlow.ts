import * as vscode from 'vscode'
import { DataStream } from './streamListener'
import { Utils } from './utils/getDetails'

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


    startSession(): void {
        if (!this.isSessionRunning) {
            this.isSessionRunning = true
            vscode.window.showInformationMessage('🔥 Coding Session Started')
            this.captureTime()
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


    captureTime(): void {
        let timeInterval = setInterval(() => {
            if (this.isSessionRunning) {
                console.log(this.utils.getLanguages())
                console.log(this.utils.getProject())
                console.log(this.utils.getOS())
                console.log(this.utils.getComputerName())
                console.log(this.utils.getOpenedFiles())
            } else {
                console.log('Session Stopped')
                clearInterval(timeInterval)
            }
        }, 5000)
    }
}