import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export async function toggleFollow(username) {
    const response = await api.post(`/api/users/toggle-follow/${username}`)
    return response.data
}

export async function getFollowedUsers() {
    const response = await api.get("/api/users/followed")
    return response.data
}

export async function getFollowers() {
    const response = await api.get("/api/users/followers")
    return response.data
}