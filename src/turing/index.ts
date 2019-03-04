const request = require('request');

const talk = (text: string) => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: 'http://openapi.tuling123.com/openapi/api/v2',
            headers: {
                'cache-control': 'no-cache'
            },
            body: JSON.stringify({
                reqType: 0,
                perception: {
                    inputText: {
                        text
                    }
                },
                userInfo: {
                    apiKey: '8a903d3283b5568e92a8dc1100cc591c',
                    userId: 'OnlyUseAlphabet'
                }
            })
        };

        request(options, function(error: any, response: any, body: any) {
            if (error) {
                reject(new Error(error));
            } else {
                try {
                    let { results } = JSON.parse(body);
                    let text = results[0].values.text;
                    resolve(text);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
};
talk('66');
export default talk;
