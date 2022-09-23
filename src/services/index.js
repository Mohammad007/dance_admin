import { API_URL } from "../baseurl"

// Get list API
export const GetAPi = async (endpoint) => {
   try {
    const response = await fetch(`${API_URL}/${endpoint}`)
    const responseJson = await response.json()
    return responseJson
   } catch (error) {
    return error
   }
}

// Delete API
export const DeleteAPi = async (endpoint, id) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`,{
            method:'DELETE'
        })
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        return error
    }
}

//Post API
export const PostAPi = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        return error
    }
}

export const userDetails = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
}