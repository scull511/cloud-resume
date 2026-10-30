---
title: 'Deploying CloudFormation using Jenkins'
slug: cloudformation-jenkins
projectID: 'pr-cfmn-jenkins'
homepage: false
visible: false
services: 'AWS - CloudFormation & S3, Jenkins, GitHub'
---

<div class="title-btn-row">
  <h2>Deploying CloudFormation using Jenkins</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

In this project, I explore Infrastructure as Code and Continuous Integration/Continuous Delivery with AWS and Jenkins. I started by manually deploying a CloudFormation template that launched a simple S3 bucket, using a Jenkins web interface to trigger a specific job.

Next, I moved to a more automated approach using a Jenkins pipeline. This pipeline involved writing code in a Jenkinsfile that defined the deployment steps, including executing the CloudFormation template. I then manually triggered this pipeline to deploy the infrastructure changes.

Finally, I achieved full CI/CD automation by integrating a Github webhook with Jenkins. This meant that whenever I pushed code changes to your Github repository, Jenkins would be automatically notified and trigger the deployment pipeline. This automated the infrastructure deployment process whenever my code changed, ensuring a faster and more reliable deployment workflow.

This project demonstrates valuable transferable skills in IaC and CI/CD pipelines, regardless of a company's specific environment, as these methodologies promote automation, efficiency, and reliability in software delivery.

<figure>
  <img src="../../public/projects/cloudformation-jenkins/image.png" width="25%" height="25%">
  <figcaption>Deploying CloudFormation using Jenkins</figcaption>
</figure>

### Services Used

- CloudFormation
- Jenkins
- GitHub
- S3

---

### Steps Taken

1. **Manually Triggered Freestyle Project.**

1.1. Used an AWS Marketplace AMI to launch an EC2 instance running Jenkins.

1.2. Logged in to Jenkins using the provided (sneakily hidden away) details.

1.3. Installed the following plugins - The Git plugin to allow the use of Github repositories for Source Control Management; The Pipeline plugin for implementing and integrating continuous delivery pipelines into Jenkins; The CloudFormation plugin for creating, using, and deleting AWS CloudFormation stacks in your environment; The AWS Credentials plugin for Jenkins to allow theuse of AWS credentials within Jenkins pipelines.

1.4. For this project, I selected 'Freestyle Project', a general-purpose job type. Here you can configure build options such as which source control system to use and the location of the code repository Jenkins will pull the code from.

1.5. I configured the build environment to use, specifying the CloudFormation recipe file Jenkins will use. This json file builds a single S3 bucket in the us-east-1 region.

1.6. Jenkins calls the CloudFormation API. For this to work, I created an IAM user with permission to use CloudFormation and S3 and then passed into Jenkins the require AWS credentials.

1.7. I then selected 'Build Now' to manually trigger this build.

1.8. Upon completion of the successful build, a new S3 bucket has been created.

2. **Manually triggered Pipeline.**

2.1. I then used Jenkins pipeline to run CloudFormation.

2.2. When configuring the pipeline, I passed in the AWS credentials and applied an IAM role to use, to allow it to access the AWS CLI. This granted permission to use S3 and CloudFormation.

2.3. When using a pipeline in Jenkins, you use a file to define the steps that will be taken. Here, the 'Jenkinsfile', writtenfollowing Groovy syntax, has only one step, which is simply used to execute a shell command to submit the CloudFormation stack. More commonly you would create multiple steps, such as 'Build', 'Test' and 'Deploy', for a multi-stage continuous delivery pipeline. This time an S3 bucket is created in the us-east-2 region.

3. **Automatically Triggered Project using GitHub Webhooks.**

3.1. When configuring the project, under Build Triggers I selected 'GitHub hook trigger for GITScm polling'. This meant that any time there was a change to the GitHub repository, it sends the webhook to the Jenkins job and the job is submitted.

3.2. To configure the webhook in GitHub, the Payload URL is the URL of the Jenkins dashboard with '/github-webhook'. At this point, any change committed to the GitHub repository should trigger the Jenkins job to begin. To test, I made a change to the CloudFormation recipe file, adding a name to the bucket created in the template.

3.3. And it triggered automatically, completed the stack creationmand created a named bucket.

3.4. Further updates were also completed successfully. Any 'change' to the bucket name meant the original bucket was deleted, and a new bucket created.
