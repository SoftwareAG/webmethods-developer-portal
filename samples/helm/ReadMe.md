##  WebMethods Developer Portal Helm chart configuration parameters
The below helm chart configurations describes Developer Portal deployment in Kubernetes.
### Overview
| S.No  |  Type of Deployment | Application Name(s)  | No of Pods  |
| ------------ | ------------ | ------------ | ------------ |
|1|Single|ElasticSearch, Portalbundle|ES-1, PortalBundle-1|
|2|Cluster|ElasticSearch, Portalbundle|ES-3, PortalBundle-2|

### Installation
```yaml
helm install <releaseName> <chartPath> -f custom-chart-values.yaml -n <releaseNamespace>
```