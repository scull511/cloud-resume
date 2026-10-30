---
title: 'Automating EC2 instances using Python'
slug: automate-ec2-stop-start
projectID: 'pr-automated-ec2'
homepage: true
visible: true
services: 'AWS - EC2, Lambda & EventBridge, Python'
---

<div class="title-btn-row">
  <h2>Automating stopping and starting of AWS EC2 instances using EventBridge and Python</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

If an organisation runs their EC2 instances outside of business hours they will still be paying for compute, storage and memory even when they are not actually being used. With EC2 instances you are charged by the second, so ensuring these instances are stopped when they are not being used can result in significant savings.

This could be achieved by using an AWS Lambda function triggered using an EventBridge schedule rule. There are two Lambda functions in this project, one will run at 8am to start the instances that are in the 'Stopped' instance state, and the other will run at 6pm to stop the instances in the 'Running' instance state. These functions will be scheduled to run daily, from Monday to Friday.

<br>

<figure>
  <img src="/images/projects/automate-ec2-stop-start/AutoStopStartEC2.png" style="max-width: 350px; border: none">
</figure>

<br>

### Services Used

EC2

Lambda (using Python (Boto3))

IAM

EventBridge

Terraform

<br>

### Steps Taken

i. The Lambda functions need permission to talk to both CloudWatch and EC2, a custom IAM policy is attached to a role, and the role is assigned to the function, the Lambda Execution Role. In the custom IAM policy, permission is granted to stop and start instances, along with permissions to connect with CloudWatch.

ii. The Lambda functions will use the AWS SDK for Python, Boto3, for programmatic access to features of Amazon EC2. The functions will iterate through every AWS region. For each region, using a boto3 resource filter, the functions will find and list either the stopped or the running instances, depending on which function.

iii. This list of instances can be iterated over and the stopped instaces will be started, and the running instaces will be stopped. This information will be recorded in CloudWatch Logs.

iv. When creating the CloudWatch rule a cron expression can be used for scheduling the event - cron(0 8 \* \* MON-FRI \*) and cron(0 18 \* \* MON-FRI \*)

<br>

---

<br>
<figure>
  <figcaption>
    Custom IAM policy
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/IAM-tf.png" style="max-width: 300px">
</figure>

<figure>
  <figcaption>
    Lambda function to start instances
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/LambdaStart.png" style="max-width: 480px">
</figure>

<figure>
  <figcaption>
    Lambda function to stop instances
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/LambdaStop.png" style="max-width: 480px">
</figure>

<figure>
  <figcaption>
    EventBridge rule using cron expressions for scheduling
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/EB-tf.png" style="max-width: 440px">
</figure>

<br>

### Testing

<figure>
  <figcaption>
    For testing, I altered the timings of the EventBridge rule
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/testing-1.png" style="max-width: 450px; border: 1px solid #ccc;">
</figure>
<figure>
  <figcaption>
    The Start instances function was triggered at 14:57
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/testing-2.png" style="max-width: 450px; border: 1px solid #ccc;">
</figure>

<figure>
  <figcaption>
    The Stop instances function was triggered at 15:01
  </figcaption>
  <img src="/images/projects/automate-ec2-stop-start/testing-3.png" style="max-width: 450px; border: 1px solid #ccc;">
</figure>

<figure>
  <img src="/images/projects/automate-ec2-stop-start/testing-4.png" style="max-width: 450px; border: 1px solid #ccc;">
</figure>
