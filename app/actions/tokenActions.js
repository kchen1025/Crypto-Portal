export const STORE_ACCESS_TOKEN = 'STORE_ACCESS_TOKEN';


export function storeAccessToken(access_token) {
    return {
      type: STORE_ACCESS_TOKEN,
      payload: {access_token}
    }
}
  
