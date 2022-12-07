# About Web Component Samples


### Development 
This project is a poc of integrating the swagger ui in API Details page

### Pre requirement

* Swagger UI uses scripts from unpkg.com data request. This requires CSP policy needs to be adapted. For example,
  `default-src 'self'; img-src * 'self' data:; object-src 'none'; child-src * mailto: tel: ms-word:; script-src 'self' unpkg.com; style-src 'self' 'unsafe-inline' unpkg.com; form-action 'self' *.okta.com unpkg.com; frame-ancestors 'self';`

The above CSP needs to be provided as value for following java property, which needs to be added in /profiles/CTP/configuration/dpo_wrapper.conf

wrapper.java.additional.3001=-Dportal.server.config.headers.content-security-policy="default-src 'self'; img-src * 'self' data:; object-src 'none'; child-src * mailto: tel: ms-word:; script-src 'self' unpkg.com; style-src 'self' 'unsafe-inline' unpkg.com; form-action 'self' *.okta.com unpkg.com; frame-ancestors 'self';"

### Tag included

`customize-swagger-ui` 

Renders the swagger ui for API created via file. If API has been created via URL then corresponding swagger file need to be added in API attachment for rendering.

