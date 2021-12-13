#!/usr/bin/env bash -e
# If the node is starting up wait for the cluster to be ready (request params: "wait_for_status=green&timeout=1s" )
# Once it has started only check that the node itself is responding
START_FILE=/tmp/.es_start_file

http () {
  local path="${1}"
  local args="${2}"
  set -- -XGET -s

  if [ "$args" != "" ]; then
     set -- "$@" $args
  fi

  if [ -n "${ELASTIC_USERNAME}" ] && [ -n "${ELASTIC_PASSWORD}" ]; then
     set -- "$@" -u "${ELASTIC_USERNAME}:${ELASTIC_PASSWORD}"
  fi

  curl --output /dev/null -k "$@" "http://127.0.0.1:9200${path}"
}

if [ -f "${START_FILE}" ]; then
   echo 'Elasticsearch is already running, lets check the node is healthy'
   HTTP_CODE=$(http "/" "-w %{http_code}")
   RC=$?
   if [[ ${RC} -ne 0 ]]; then
      echo "curl --output /dev/null -k -XGET -s -w '%{http_code}' \${BASIC_AUTH} http://127.0.0.1:9200/ failed with RC ${RC}"
      exit ${RC}
   fi
   # ready if HTTP code 200, 503 is tolerable if ES version is 6.x
   if [[ ${HTTP_CODE} == "200" ]]; then
      exit 0
   elif [[ ${HTTP_CODE} == "503" && "7" == "6" ]]; then
      exit 0
   else
      echo "curl --output /dev/null -k -XGET -s -w '%{http_code}' \${BASIC_AUTH} http://127.0.0.1:9200/ failed with HTTP code ${HTTP_CODE}"
      exit 1
   fi

else
   echo 'Waiting for elasticsearch cluster to become ready (request params: "wait_for_status=green&timeout=1s" )'
   if http "/_cluster/health?wait_for_status=green&timeout=1s" "--fail" ; then
      touch ${START_FILE}
      exit 0
   elif http "/_cluster/health?wait_for_status=yellow&timeout=1s" "--fail" ; then
      touch ${START_FILE}
      exit 0
   else
      echo 'Cluster is not yet ready (request params: "wait_for_status=green&timeout=1s" or "wait_for_status=yellow&timeout=1s")'
      exit 1
   fi
fi
