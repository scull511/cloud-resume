---
title: 'Cloud Resume Challenge'
slug: cloud-resume-challenge
projectID: 'pr-crc'
homepage: true
visible: true
services: 'AWS - S3, CloudFront, Route 53, Lambda & DynamoDB, Astro/HTML/CSS, JavaScript, Python, GitHub Actions'
---

<div class="title-btn-row">
  <h2>Cloud Resume Challenge</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

The Cloud Resume Challenge is a hands-on project designed to help aspiring cloud professionals gain real-world experience with cloud technologies. It involves building a personal website on a cloud platform, AWS in this case.

This website you are viewing is my attempt at the Cloud Resume Challenge. In building this, I leveraged various technologies and services, including AWS services such as S3, CloudFront, Lambda and DynamoDB; GitHub for source control and GitHub Actions to create a CI/CD Pipeline; and Terraform for Infrastructure as Code, to deploy resources more efficiently and reliably.

<figure>

  <img src="/images/projects/cloud-resume-challenge/CloudResumeChallenge.png" style="max-width: 300px; border: none">
  <figcaption>Cloud Resume Challenge Architecture</figcaption>
</figure>

### Services Used

- Astro/HTML/CSS/JavaScript
- S3
- CloudFront
- AWS Certificate Manager
- Route 53
- Lambda
- Python
- DynamoDB

---

### Steps Taken

1. **Website Development**: I constructed the website using Astro, a JavaScript framework (possibly a bit overkill for a CV website but I wanted the practice), HTML, CSS and JavaScript.

<figure>
  <figcaption>
    Website Code
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/website.png" style="max-width: 300px">
</figure>

2. **Cloud Storage**: To ensure secure and scalable file management, I used an S3 bucket for cloud-based storage of the website's assets.

<figure>
  <figcaption>
    S3 Bucket for Storage
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/s3bucket.png" style="max-width: 400px">
</figure>

3. **Content Delivery Optimization**: For enhanced website performance, I used Amazon CloudFront, a content delivery network that streamlines content delivery, providing a low latency connection to the website files located in the S3 bucket.

<figure>
  <figcaption>
    CloudFront Distribution
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/cloudfrontdist.png" style="max-width: 400px">
</figure>

4. **Alternate Domain Name**: With CloudFront, you can also set an alternate domain name as the domain. In Amazon Route 53, I created a DNS record for this alternative domain name. The record routes traffic to the CloudFront distribution.

<figure>
  <figcaption>
    Route 53 Domain (Subdomain)
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/r53.png" style="max-width: 250px">
</figure>

5. **Website Security**: I configured CloudFront to use HTTPS for security and used AWS Certificate Manager to obtain an SSL certificate, thereby encrypting data and safeguarding user information.

<figure>
  <figcaption>
    SSL/TLS certificate
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/acm.png" style="max-width: 400px">
</figure>

6. **Tracking Website View Count**: To gain insights into user engagement, I created a DynamoDB table, a NoSQL database. I then created a Lambda function, written in Python, to track the number of visits. The visits were tracked by incrementing the view count every time the site was loaded - site loads triggering the lambda function using a fetch request. This function uses Boto3, the AWS SDK that allows you to interact with AWS services in your code.

<figure>
  <figcaption>
    Lambda function and Dynamo DB table
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/lambda.png" style="max-width: 350px">
</figure>

7. **Data Visualization Integration**: To display the visitor count directly on the website, I used a JavaScript function. This function retrieves the view count from the Lambda function and presents it on the web page.

<figure>
  <figcaption>
    View Counter
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/viewcount.png" style="max-width: 200px">
</figure>

8. **Version Control**: For efficient code management, I established a GitHub repository, serving as a centralised repository for all website files.

<figure>
  <figcaption>
    
  </figcaption>
  <!-- <img src="../images/projects/cloud-resume-challenge/GH.png" style="max-width: 300px"> -->
</figure>

9. **Automated Deployments**: Finally, I implemented a CI/CD pipeline through GitHub Actions. This automates website updates whenever code modifications are introduced, ensuring an efficient deployment process.

<figure>
  <figcaption>
    
  </figcaption>
  <img src="/images/projects/cloud-resume-challenge/GHAyml.png" style="max-width: 425px">
</figure>

10. The **Cloud Resume Challenge** not only equipped me with valuable technical skills, it also gave me a stronger understanding of the practical applications of cloud technologies.

<figure>
  <figcaption>
    
  </figcaption>
  <!-- <img src="../images/projects/cloud-resume-challenge/IAM-tf.png" style="max-width: 300px"> -->
</figure>

<!--
terraform/
├── providers.tf      # AWS provider config, backend config
├── s3.tf             # bucket + policy
├── cloudfront.tf      # distribution
├── route53.tf         # records
├── acm.tf              # certificate
├── dynamodb.tf        # table
├── lambda.tf           # function + IAM role
├── api_gateway.tf      # HTTP API + routes + CORS
├── variables.tf         # input variables
└── outputs.tf            # useful outputs (e.g. API URL, CloudFront domain)
 -->
