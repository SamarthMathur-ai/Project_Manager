import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});


// ! Request Interceptor

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})



// ! Response Interceptor

api.interceptors.response.use(
    (response)=> {
        // * everything is fine, pass the response through
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // * If we get a 401 and haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // * Prevent infinite loops
            
            try {
                // *1. Get the current refresh token from localStorage
                const refreshToken = localStorage.getItem("refreshToken");

                // *2. Call your backend route to get a new access token
                const response = await axios.post("http://localhost:3000/auth/newRefreshToken", {token: refreshToken});
                const {accessToken} = response.data;

                // *3. Save the new access token
                localStorage.setItem("accessToken", accessToken);

                // *4. Update the header for the original request and retry it
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // * If refresh fails (e.g. refresh token also expired), logout
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
            
        }

        // * Pass the error along to the componenet that made the request
        return Promise.reject(error);
    }
)


export default api;