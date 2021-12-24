import clienteAxios from "./axios";

const tokenAuth = token => {
    if( token ) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // eslint-disable-next-line no-unused-expressions
        clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;