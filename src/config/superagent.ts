const superagent = require('superagent');

//请求
export function req(
    url: string,
    method: string,
    params?: any,
    data?: any,
    cookies?: any
) {
    return new Promise(function(resolve, reject) {
        superagent(method, url)
            .query(params)
            .send(data)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(err: any, response: any) {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
    });
}
