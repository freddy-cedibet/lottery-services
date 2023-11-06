import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface AxiosRequestParams {
    method: Method;
    url: string;
    data?: any;
    params?: any;
    authType?: 'None' | 'Bearer' | 'Basic';
    authToken?: string;
    headers?: Record<string, string>;
}

const axiosRequest = async ({
                                method,
                                url,
                                data = {},
                                params = {},
                                authType = 'None',
                                authToken = '',
                                headers = {}
                            }: AxiosRequestParams): Promise<AxiosResponse<any>> => {
    // Ensure headers is always an object
    const safeHeaders: Record<string, string> = headers || {};

    // Handle different authentication types
    switch (authType) {
        case 'Bearer':
            safeHeaders['Authorization'] = `Bearer ${authToken}`;
            break;
        case 'Basic':
            safeHeaders['Authorization'] = `Basic ${authToken}`;
            break;
        // Add more cases for other authentication types if needed
        default:
            break; // No auth
    }

    // Constructing the Axios request configuration
    const config: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: safeHeaders,
        data: data,
        params: params
    };

    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            console.error('Axios error:', error.message);
            throw error;
        } else {
            // Handle other errors
            console.error('Unexpected error:', error);
            throw error;
        }
    }
};

export default axiosRequest;
