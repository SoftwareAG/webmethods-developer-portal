{{/*
Get elasticsearch service name
*/}}
{{- define "elasticsearch.getServiceName" -}}
{{- $deploymentType:= lower .root.Values.deploymentType -}}
{{- if eq $deploymentType "cluster" -}}
{{- printf "devportal-es-svc" -}}
{{- else -}}
{{- printf "devportal-es-svc" -}}
{{- end -}}
{{- end -}}

{{/*
Get if applications block is defined or not
*/}}
{{- define "devportal.getApplicationsExistence" -}}
{{- $applications:= "" -}}
{{- $applications:= index .root "Values" "applications" | default dict -}}
{{- if $applications -}}
{{- printf "true" -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- end -}}

{{/*
Get if app specific block is defined or not
*/}}
{{- define "devportal.getApplicationBlockExistence" -}}
{{- $appStatus:= "" -}}
{{- $app:= "" -}}
{{- $appStatus:= include "devportal.getApplicationsExistence" (dict "root" .root) -}}
{{- if eq $appStatus "true" -}}
{{- $app:= index .root "Values" "applications" .application | default dict -}}
{{- if $app -}}
{{- printf "true" -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- end -}}

{{/*
Get if app specific paid config block is defined or not
*/}}
{{- define "devportal.appSpecific.getPaidBlockExistence" -}}
{{- $appStatus:= "" -}}
{{- $paidConfig:= "" -}}
{{- $appStatus:= include "devportal.getApplicationBlockExistence" (dict "application" .application "root" .root) -}}
{{- if eq $appStatus "true" -}}
{{- $paidConfig:= index .root "Values" "applications" .application "paid" | default dict -}}
{{- if $paidConfig -}}
{{- printf "true" -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- end -}}

{{/*
Get if app specific paid deploymentType config block is defined or not
*/}}
{{- define "devportal.appSpecific.getPaidDeploymentTypeBlockExistence" -}}
{{- $deploymentType:= lower .root.Values.deploymentType -}}
{{- $paidConfigStatus:= "" -}}
{{- $paidDeploymentTypeConfig:= "" -}}
{{- $paidConfigStatus:= include "devportal.appSpecific.getPaidBlockExistence" (dict "application" .application "root" .root) -}}
{{- if eq $paidConfigStatus "true" -}}
{{- $paidDeploymentTypeConfig:= index .root "Values" "applications" .application "paid" $deploymentType | default dict -}}
{{- if $paidDeploymentTypeConfig -}}
{{- printf "true" -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- else -}}
{{- printf "false" -}}
{{- end -}}
{{- end -}}

{{/*
Get deployment specific app config
*/}}
{{- define "devportal.appSpecific.getdeploymentTypeConfigAsYaml" -}}
{{- $deploymentType:= lower .root.Values.deploymentType -}}
{{- $paidDeploymentTypeConfigStatus:= "" -}}
{{- $paidDeploymentTypeConfig:= "" -}}
{{- $paidDeploymentTypeConfigStatus = include "devportal.appSpecific.getPaidDeploymentTypeBlockExistence" (dict "application" .application "root" .root) -}}
{{- if eq $paidDeploymentTypeConfigStatus "true" -}}
{{- $paidDeploymentTypeConfig = index .root "Values" "applications" .application "paid" $deploymentType .config | default dict -}}
{{- end -}}
{{- if $paidDeploymentTypeConfig -}}
{{- toYaml $paidDeploymentTypeConfig -}}
{{- end -}}
{{- end -}}