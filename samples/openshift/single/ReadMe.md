* Create and register a elasticsearch service of type ClusterIP

  `oc create -f es-svc.yaml`

* Create a stateful set with 1 replicas of elasticsearch of version 7.13.2

  `oc create -f elasticsearch.yaml`

* Create a stateful set with 1 replicas of devportal of version 10.11.0.3

  `oc create -f devportal.yaml`

* Create and register a loadbalancer service to expose Http/Https ports

  `oc create -f devportal-lb.yaml`

* Create a Route to access the application outside of Openshift cluster

  `oc create -f devportal-route.yaml`