# About Web Component Samples


### Development 
This project is a single twitter timeline rendering JavaScript file.

### Pre requirement

* Twitter timeline uses scripts from *.twitter.com data request. This requires CSP policy needs to be adapted. For example,
  `default-src 'self'; img-src * 'self' data:; object-src 'none'; child-src * mailto: tel: ms-word:; script-src 'self' *.stripe.com *.twitter.com; style-src 'self' 'unsafe-inline' *.twitter.com; form-action 'self' *.okta.com *.twitter.com; frame-ancestors 'self';"`

The above CSP needs to be provided as value for following java property, which needs to be added in /profiles/CTP/configuration/dpo_wrapper.conf

wrapper.java.additional.3001=-Dportal.server.config.headers.content-security-policy="default-src 'self'; img-src * 'self' data:; object-src 'none'; child-src * mailto: tel: ms-word:; script-src 'self' *.stripe.com *.twitter.com; style-src 'self' 'unsafe-inline' *.twitter.com; form-action 'self' *.okta.com *.twitter.com; frame-ancestors 'self';"

### Tag included

`wc-twitter-timeline` 

Renders the provided twitter feeds with specified width/height 

