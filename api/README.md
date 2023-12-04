## Requisites

### IAM User
Create a IAM user
Save it in the environment file under `IAM_USER`
Also add an access key & add it to you aws credentials file
Add the deployment policy & attach it to the new user
Replace [IAM_ID] in the deployment policy

### Hosted Zone

- Add your domain to AWS
- Copy the hosted zone id

## Development
Deployment

serverless deploy "policies"
serverless create-cert
serverless create_domain
serverless deploy "resources"

Afterwards:
serverless deploy "app"