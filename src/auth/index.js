import OktaSignIn from '@okta/okta-signin-widget'
import router from '../router';

const BASE_URL = 'https://dev-micah.okta.com';
const CLIENT_ID = '0oapu4btsL2xI0y8y356';
const REDIRECT_URL = window.location.origin + '/authorization-code/callback';

const OPTIONS = {
    baseUrl: BASE_URL,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URL,
    authParams: {
        display: 'page',
        responseType: 'code',
        grantType: 'authorization_code'
    },
    features: {
        rememberMe: false
    }
};

var signIn = new OktaSignIn(OPTIONS);

export function renderSignInWidget(el) {
    signIn.renderEl({el: el});
}
  
export async function callback() {
    signIn.authClient.token.parseFromUrl()
    .then((tokens) => {
        tokens.forEach((token) => {
            if (token.idToken) {
                signIn.authClient.tokenManager.add('id_token', token);
            } else if (token.accessToken) {
                signIn.authClient.tokenManager.add('access_token', token);
            }
        });
        router.push('/profile');
    })
    .catch(console.error);
}

export function getIdToken() {
    return signIn.authClient.tokenManager.get('id_token');
}
  
export function getAccessToken() {
    return signIn.authClient.tokenManager.get('access_token');
}
  