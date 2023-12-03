
export * from './constants'

export const setItemInLocalStorage =(key,value)=>{

    if(!key||!value)
    {
        console.error('Cannot store in Local Storage')
    }

    const valueToStore= typeof value !== 'string'?JSON.stringify(value):value;

    localStorage.setItem(key,valueToStore);

}

export const getItemFromLocalStorage =(key)=>{

    if(!key)
    {
        console.error('Cannot get key from Local Storage')
    }

    return localStorage.getItem(key);

}

export const removeItemFromLocalStorage =(key)=>{

    if(!key)
    {
        console.error('Cannot remove key from Local Storage')
    }

    localStorage.removeItem(key);

}

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