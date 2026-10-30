---
title: 'Event-driven File Transfer with AWS S3 and AWS Lambda'
slug: event-driven-file-transfer
projectID: 'pr-event-driven-files'
homepage: true
visible: true
services: 'S3, IAM, KMS, Lambda, CloudWatch, Terraform'
---

<div class="title-btn-row">
  <h2>Automated, Event-Driven File Transfer with AWS S3 and AWS Lambda</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

This project demonstrates a secure, cost-effective, and automated solution for transferring files between two Amazon S3 buckets within the same region. The system leverages AWS services such as S3, Lambda, Key Management Service (KMS), and Identity and Access Management (IAM) to create a seamless and secure file transfer workflow. This solution addresses various real-world needs, including data backup and replication, triggering downstream processing pipelines, ensuring compliance through secure data copies, and efficiently distributing content across different environments. The automation, driven by S3 event notifications and a Lambda function using Python, eliminates manual intervention, while the serverless architecture ensures scalability and cost-effectiveness through pay-as-you-go pricing and the avoidance of inter-region data transfer costs.

Security is of highest importance, with data encrypted at rest using AWS KMS and access strictly controlled through fine-grained IAM policies. The event-driven nature of the system further reduces the attack surface by only activating the Lambda function when necessary. This combination of automation, cost efficiency, and robust security practices makes this solution a valuable asset for organisations seeking to manage and transfer data securely and efficiently within the AWS ecosystem.

<br>

<figure>
  <img src="/images/projects/event-driven-file-transfer/event-driven-file-transfer.png" style="max-width: 500px; border: none; background: none; padding: 0">
</figure>

<br>

### Services Used

Amazon S3

AWS Lambda

AWS Identity and Access Management

AWS Key Management Service

AWS CLI

Terraform

<br>

### Steps Taken

<figure>
  <figcaption><strong>Source and Destination Buckets</strong>: Two S3 buckets are created in the same AWS region. The source bucket is where files are initially uploaded, and the destination bucket is where the files are copied to.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/tf-provider.png" style="max-width: 210px"><br />
  <img src="/images/projects/event-driven-file-transfer/tf-s3-buckets.png" style="max-width: 560px">
</figure><br />
<figure>
  <figcaption><strong>Event Notification</strong>: An S3 event notification is configured on the source bucket to trigger an AWS Lambda function whenever a new file is uploaded, as displayed in the AWS console.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/tf-s3-notification.png" style="max-width: 430px"><br />
  <img src="/images/projects/event-driven-file-transfer/console-s3-event-notification.png" style="max-width: 750px"><br />
  <img src="/images/projects/event-driven-file-transfer/console-lambda-trigger.png" style="max-width: 225px">
</figure><br />
<figure>
  <figcaption><strong>Lambda Function</strong>: The Lambda function, written in Python using the Boto3 library, is triggered by the S3 event. It copies the uploaded file from the source bucket to the destination bucket using the 'copy_object' method.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/tf-lambda-tf-f.png" style="max-width: 400px"><br />
  <img src="/images/projects/event-driven-file-transfer/tf-lambda-fun.png" style="max-width: 620px">
</figure><br />
<figure>
  <figcaption><strong>Encryption</strong>: Both buckets are configured to use AWS KMS for encryption-at-rest, ensuring that all data is securely encrypted.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/tf-s3-kms.png" style="max-width: 350px"><br />
  <img src="/images/projects/event-driven-file-transfer/console-bucket-kms-enc.png" style="max-width: 450px">
</figure><br />
<figure>
  <figcaption><strong>IAM Policies</strong>: IAM policies are applied to both buckets and the Lambda function to ensure that only authorised entities have the necessary permissions to perform actions such as uploading, copying, and accessing files.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/tf-lambda-iam-f.png" style="max-width: 375px"><br />
</figure><br />
<figure>
  <figcaption><strong>File Upload</strong>: For testing, I uploaded a .txt file to the source bucket using the AWS CLI.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/cli-upload-file-to-source.png" style="max-width: 500px"><br />
</figure><br />
<figure>
  <figcaption><strong>File Uploaded and then Copied</strong>: When I used 's3 ls' in the AWS to list the contents of each bucket, I could see that the file was uploaded to the source bucket and automatically uploaded to the destination bucket within a couple of seconds.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/cli-copied-files.png" style="max-width: 650px"><br />
  <img src="/images/projects/event-driven-file-transfer/console-file-in-src.png" style="max-width: 650px"><br />
  <img src="/images/projects/event-driven-file-transfer/console-file-in-dest.png" style="max-width: 650px"><br />
</figure><br />
<figure>
  <figcaption><strong>File Encryption</strong>: The buckets are configured with default server-side encryption with AWS Key Management Service keys (SSE-KMS). This encryption is automatically applied to new objects stored in the bucket.</figcaption>
  <img src="/images/projects/event-driven-file-transfer/cli-dest-bucket-encryption.png" style="max-width: 325px"><br />
  <img src="/images/projects/event-driven-file-transfer/cli-file-in-source.png" style="max-width: 325px"><br />
  <img src="/images/projects/event-driven-file-transfer/cli-file-in-dest.png" style="max-width: 325px">
</figure><br />

<style>
  figure img {
    background-color: #202830;
    padding: 10px 5px;
  }

  figure.console-img img {
    background-color: #fff;
    padding: 2px 1px;
  }
</style>
