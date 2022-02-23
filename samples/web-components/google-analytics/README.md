# About Web Component Samples


### Development 
This project is a single google analytics integration JavaScript file.

### Pre requirement

* Google analytics uses scripts from www.googletagmanager.com and google-analytics.com and also connects to
google-analytics.com for data request. This requires CSP policy needs to be adapted. For example,
 `default-src 'self' https://www.google-analytics.com/; script-src 'self' https://www.googletagmanager.com/ https://www.google-analytics.com/;`
  
* Need to register with google-anlytics and unique track id needs to be updated in the js file 


### Tag included

`wc-js-google-analytics` 

This element renders an API. If this element is used in api gallery configuration,
the API data will be injected as part of the context.
 

