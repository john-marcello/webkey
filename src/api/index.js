/** @format */

import axios from "axios";
//let TOKEN_KEY = localStorage.getItem("TOKEN_KEY");
export async function getLinks() {
    try {
        const { data } = await axios.get("/api/links");
        return data;
    } catch (error) {
        throw error;
    }
}
export async function register({ username, password }) {
    console.log("getting to the register function");
    try {
        // const axiosInstance = axios.create({ baseURL: "http://localhost:5000" });
        const { data: { user: newUser } } = await axios.post("/api/users/register", {
            username: username,
            password: password,

        });
        // const { data } = await response.json();   not sure we need this with axios
        console.log("is this working", newUser);
        //const user = data.user;
        let user = newUser;

        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        } else {
            alert("you have not created an account. Please login to access features.");
        }
    } catch (error) {
        throw console.error;
    }
}


export async function login({ username, password }) {

    try {
        const { data: { user } } = await axios.post('api/users/login', {
            username,
            password
        });
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
    } catch (error) {
        throw error;
    }
}

export async function getTags(userId) {

    try {
        const { data: tags } = await axios.post('/api/tags/usertags', { userId: userId });
        
        if (tags) {
            tags.sort((a, b) => {
                if (a.title[0] - b.title[0] === 0) {
                    if (a.title[1] - b.title[1] === 0 ) {
                        return a.title[2] - b.title[2];
                    } else {
                        return a.title[1] - b.title[1];
                    }
                } else {
                    return a.title[0] - b.title[0];
                }
            });
            return tags;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}


export async function addNewLink({ title, date, clicks, description, url, tags = [] }) {

    try {
        const { data: link } = await axios.post('api/links', {
            title, date, clicks, description, url, tags
        })
        if (link) {
            console.log('getting tags to the front', link)
            return link
        } else {
            return {}
        }

    } catch (error) {
        throw error
    }
}

    export async function updatedLink({ title, date, clicks, description, url, tags = [] }) {

        try { // this is working because 4 is hard coded.
            const { data: link } = await axios.patch('api/links/4', {
                title, date, clicks, description, url, tags
            })
            if (link) {
                console.log('getting tags to the front', link)
                return link
            } else {
                return {}
            }
    
        } catch (error) {
            throw error
        }

}