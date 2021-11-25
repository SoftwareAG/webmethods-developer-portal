* To deploy cluster of developer portal with elasticsearch
    
  `docker-compose up`

* Once containers are up the developer portal for a container, devportal_0 will be exposed in 8083 (http) and 8084 (https) 
& devportal_1 will be exposed in 8085 (http) and 8086 (https)
  
* You can have external load balancer between 8083 and 8085 & 8084 and 8086  to balance the UI traffic