/* eslint-disable @typescript-eslint/naming-convention */
import http = require('http');

class APIHandler {
    static async sendData() {
        const baseURL = ''

        const postData = JSON.stringify({
            // To Be Implemented
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        }

        const request = http.request(baseURL, options, (response) => {
            let data = ''

            response.on('data', (chunk) => {
                data += chunk.toString()
            })
        })

        request.on('error', (error) => {
            console.log('Error:', error)
        })

        request.write(postData)
        request.end()
    }
}