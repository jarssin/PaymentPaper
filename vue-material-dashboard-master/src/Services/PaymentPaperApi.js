const axios = require('axios');

export const apiPaper = axios.create({
    baseURL: `http://127.0.0.1:3333`,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY0NjExOTU2MH0.AwB764pJCBEOSBdUInDNBMNuL5K6AbjPmuVf39Z5-sg'
    }
});
