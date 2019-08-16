<template>
  <div>
    <div v-if="idToken">
      <h1>My Profile</h1>
      <p><strong>ID Token:</strong></p>
      <div class="wrapit">{{ idToken }}</div>
      <p><strong>Access Token:</strong></p>
      <div class="wrapit">{{ accessToken }}</div>
      <h2>Profile details:</h2>
      <ul>
        <li><strong>Name: </strong> {{ claims.name }} </li>
        <li><strong>App Username: </strong>{{ claims.preferred_username }} </li>
        <li><strong>App ID: </strong> {{ claims.aud }} </li>
        <li><strong>SSO provided by: </strong> {{ claims.iss }} </li>
        <li><strong>Session Start: </strong> {{ tokenIssued }} </li>
        <li><strong>Session Timeout: </strong> {{ tokenExpiry }} </li>
      </ul>
    </div>
    <div id="osw-container"></div>
  </div>
</template>

<script>

import { getIdToken, getAccessToken, renderSignInWidget } from '../auth'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

export default {
  data() {
    return {
      accessToken: '',
      idToken: '',
      claims: '',
      tokenIssued: '',
      tokenExpiry: ''
    }
  },
  mounted() {
    getIdToken()
    .then(token => {
      if (token) {
          this.idToken = token.idToken;
          this.claims = token.claims;
          this.tokenIssued = new Date(this.claims.iat * 1000).toString();
          this.tokenExpiry = new Date(this.claims.exp * 1000).toString();
          getAccessToken().then(token => this.accessToken = token.accessToken);
      } else {
        renderSignInWidget('#osw-container')
      }
    });
  }
}
</script>
<style>
.wrapit {
    overflow-wrap: break-word;
    word-wrap: break-word;
}
ul {
    list-style-type: none;
}
</style>
