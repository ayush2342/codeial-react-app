
export * from './constants'

export const getFormBody =(params)=>{

    let formBody=[];

    for(let property in params)
    {
        const encodedKey=encodeURIComponent(property); //user name => user%20name
        const encodedValue=encodeURIComponent(params[property]); //ayush 123 => ayush%20123

        formBody.push(encodedKey+'='+encodedValue)
    }

    return formBody.join('&'); //'username=ayush&password=12345'
}