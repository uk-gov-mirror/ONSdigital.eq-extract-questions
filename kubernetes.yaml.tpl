# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

apiVersion: apps/v1
kind: Deployment
metadata:
  name: eq-extract-questions
  labels:
    app: eq-extract-questions
spec:
  replicas: 1
  selector:
    matchLabels:
      app: eq-extract-questions
  template:
    metadata:
      labels:
        app: eq-extract-questions
    spec:
      containers:
      - name: eq-extract-questions
        image: eu.gcr.io/GOOGLE_CLOUD_PROJECT/eq-extract-questions:COMMIT_SHA
        ports:
        - containerPort: 3000
      env:
        - name: AUTHOR_SCHEMA_URL
          valueFrom:
            secretKeyRef:
              name: extract-questions-secrets
              key: AUTHOR_SCHEMA_URL
        - name: RUNNER_SCHEMA_URL
          valueFrom:
            secretKeyRef:
              name: extract-questions-secrets
              key: RUNNER_SCHEMA_URL
---
kind: Service
apiVersion: v1
metadata:
  name: eq-extract-questions
spec:
  selector:
    app: eq-extract-questions
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
