import axios from "axios";

//process.env.NEXT_PUBLIC_ENV_VARIABLE

const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENV_VARIABLE
})

const $authHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENV_VARIABLE
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}