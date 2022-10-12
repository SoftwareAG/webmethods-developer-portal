* Create and register a elasticsearch service of type ClusterIP 
    
    `kubectl create -f es-svc.yaml`

* Create a stateful set with 1 replicas of elasticsearch of version 8.2.3
    
    `kubectl create -f elasticsearch.yaml`

* Create a stateful set with 1 replicas of devportal of version 10.15
    
    `kubectl create -f devportal.yaml`

* Create and register a loadbalancer service to expose Http/Https ports  

    `kubectl create -f devportal-lb.yaml`
