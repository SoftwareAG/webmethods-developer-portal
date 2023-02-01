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

### How to use

1. Login as Administrator
2. Navigate to Administration -> Themes 
3. Click `customize` icon in the theme you want to customize
4. In the left navigation, choose `Web Components` section
5. Register new web component with the file `google-analytics.js`
6. To load this webcomponent on initial page load, add `web component` in `header` or `footer` from the `Pages` section.
7. After adding the web component, edit the component, choose the web component registered and provide `wc-js-google-analytics` as element name. 
8. Save the changes and activate the theme.
 

