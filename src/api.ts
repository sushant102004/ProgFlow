/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode'
import http = require('http');
import axios from 'axios';

export class APIHandler {
    async addProject(ctx: vscode.ExtensionContext, name: string) {
        const baseURL = 'http://localhost:8080/project/add'

        const apiKey: string = ctx.globalState.get('progflow.apiKey') ?? ""

        const postData = JSON.stringify({
            name: name
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length,
                'x-api-key': apiKey
            }
        }

        const request = http.request(baseURL, options, (response) => {
            let data = ''

            response.on('data', (chunk) => {
                data += chunk.toString()
            })

            response.on('end', () => {
                console.log('Response:', data)
            });
        })

        request.on('error', (error) => {
            console.log('Error:', error)
        })

        request.write(postData)
        request.end()
    }


    async updateCodingActivity(ctx: vscode.ExtensionContext, name: string) {
        const baseURL = 'http://localhost:8080/coding-activity'

        const apiKey: string = ctx.globalState.get('progflow.apiKey') ?? ""

        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }

        axios.post(baseURL, { projectName: name }, { headers })
    }
}