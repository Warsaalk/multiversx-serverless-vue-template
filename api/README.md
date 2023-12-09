# The serverless API

## Environment file

You can start from the environment example file `serverless.env.yml-example`.
Here are the properties and their possible values.
Rename the file to `serverless.env.yml`, Serverless will automatically detect it.

|  property  |       value       |                                                                  description                                                                   |
|:----------:|:-----------------:|:----------------------------------------------------------------------------------------------------------------------------------------------:|
| DB_STRING  | mongodb+srv://... |                            The application template works with MongoDB, but you could implement any other database.                            |
| IAM_ID | 123456789... |                          The ID of your AWS account. This is necessary to set specific permissions on your resources.                          |
| IAM_USER | iamuser |                                   The IAM username that you'll use to deploy the API (requires CLI access).                                    |
| APP_DOMAIN | mydomain.com |                                             The domainname on which the API (app) will be running.                                             |
| APP_DOMAIN_ZONE | ZX.... |                                                The Route53 zone in which the domain is present.                                                |
| APP_SECRET | RANDOMSTRING |                                             A random generated string that can be used for hashing                                             |
| APP_VERSION | 0.0.X |                           This version will be used to make sure your used assets are refreshed on new deployments.                            |
| APP_CACHE_TTL | 0 |                                                    This parameter is unused at the moment.                                                     |
| BASE_PATH | / |                                           The base path set in the head HTML of your index request.                                            |
| ASSETS_LOCAL | true | You can set this property to true to use a local path to your development assets. This will stop a CloudFront distribution from being created. |
| ASSETS_DOMAIN | localhost or mydomain.com |  Your assets domain, this domain will also be used to create your CloudFront distribution. Or your local domain if `ASSETS_LOCAL` is `true`.   | 
| ASSETS_PATH | /locale/path/app/dist/ |                                  The path to your assets directory, this should be `/` when using CloudFront.                                  |
| ASSETS_BUCKET | assets... | The S3 bucket that will be created to host your assets on. |
| CORS | true | Allow CORS on your serverless requests. |

## Requisites

This application can only be deployed on AWS currently, so you will need an AWS account.

### IAM User
First you will need to create an IAM user.
This user will be used to deploy the application on your AWS account.
Once created you can save it in the environment file under `IAM_USER`.
Next you need to add an access key to the user and add it to your AWS credentials file on your computer.

### Deployment permissions

Once the user is created we need to add permissions to that user so our serverless API can be deployed.
Create a policy in IAM and attach it to the new user.
The contents of this policy can be found in the following file: `api/serverless-deployment-policy.json`.
Make sure to replace [IAM_ID] in the policy with the ID of your AWS account.

### Hosted Zone

The application manages all needed records so your API & assets domain are deployed correctly.
For this you will need to add the domain to AWS.
You can do this by creating a hosted zone in Route53.
If you have bought your domain outside of AWS you need to add the generated NS-records to your domain with the other registrar.
When that is done you can add the hosted zone id to your environment file under `APP_DOMAIN_ZONE`.

## Development

The commands below will help you set up the API for the first time and deploy changes later on.

### The first time
Make sure to run these command in the order they are presented here.
First deploy the policies.
```
user@pc:/home/user/project$ serverless deploy --config=serverless-policies.yml --stage=develop --aws-profile=user
```
Create the necessary SSL certificates for the API & assets domain.
```
user@pc:/home/user/project$ serverless create-cert --config=serverless-resources.yml --stage=develop --aws-profile=user
```
Create the api domain that will connect your AWS API to the internet via de domain.
```
user@pc:/home/user/project$ serverless create_domain --config=serverless-resources.yml --stage=develop --aws-profile=user
```
Deploy the generic resources for the application.
```
user@pc:/home/user/project$ serverless deploy --config=serverless-resources.yml --stage=develop --aws-profile=user
```
Deploy the user functions for the application.
```
user@pc:/home/user/project$ serverless deploy --config=serverless-user.yml --stage=develop --aws-profile=user
```

### Thereafter
Depending on if you add new resources or functions you can deploy or the resources or user yaml.
```
user@pc:/home/user/project$ serverless deploy --config=serverless-resources.yml --stage=develop --aws-profile=user
user@pc:/home/user/project$ serverless deploy --config=serverless-user.yml --stage=develop --aws-profile=user
```