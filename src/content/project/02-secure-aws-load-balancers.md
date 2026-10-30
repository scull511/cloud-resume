---
title: 'Secure AWS Load Balancers'
slug: secure-aws-load-balancers
projectID: 'pr-load-balancers'
homepage: true
visible: true
services: 'AWS - EC2, ACM & CloudFormation'
---

<div class="title-btn-row">
  <h2>Secure Listeners for AWS Load Balancing</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

Auto Scaling and Load Balancing are features that provide your applications with elasticity and high availability.

Auto Scaling automates the process of launching and terminating EC2 instances based on the traffic demand for your application. Load Balancing ensures the automatic distribution of incoming traffic across multiple targets, such as EC2 instances.

An Application Load Balancer is a layer 7 load balancer, best suited for load balancing of HTTP and HTTPS traffic, and can route traffic to targets within an Amazon VPC.

SSL/TLS certificates can be added to load balancers ensuring secure, encrypted communication over the internet, between a client and the load balancer.

<br>

<figure>
  <img src="/images/projects/secure-aws-load-balancer/SecureALB.png" style="max-width: 300px; border: none; background: none; padding: 0">
</figure>

<br>

### Services Used

EC2 - Auto Scaling, Elastic Load Balancing

AWS Certificate Manager

Route 53

CloudFormation

<br>

### Steps Taken

I used CloudFormation to run a template that created an auto scaling group and a load balancer, this created three EC2 instances running across three availability zones. The instances were launched with user data that installed an Apache web server which used EC2 metadata to display the availability zone of that particular instance.

Once the infrastructure had been created, I added a secure listener to the load balancer, listening on port 443 for HTTPS transmissions over TLS/SSL. I used an existing SSL/TLS certificate I created using AWS Certificate Manager. Then in Route 53, I created an alias record in my domain's hosted zone to route traffic to the application load balancer, enabling a HTTPS connection to a subdomain, test.simoncull.co.uk.

On refresh, the web page displayed a different availability zone, showing how the load balancer was distributing the network traffic across the three EC2 instances.

<br>
<figure>
  <figcaption>Parameters required for CloudFormation-built infrastructure</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-parameters.png" style="max-width: 400px">
</figure>
<figure>
  <figcaption>Security Groups for traffic to and from the load balancer</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-sg.png" style="max-width: 380px">
</figure>
<figure>
  <figcaption>Launch template to create EC2 instances based on auto scaling requirements</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-lt.png" style="max-width: 800px">
</figure>
<figure>
  <figcaption>Auto scaling group configured with a desired capacity of 3 instances</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-asg.png" style="max-width: 380px">
</figure>
<figure>
  <figcaption>Load balancer with attached subnets</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-lb.png" style="max-width: 380px">
</figure>
<figure>
  <figcaption>Target group with port and protocol used for routing traffic</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-tg.png" style="max-width: 380px">
</figure>
<figure>
  <figcaption>Port on which load balancer is listening and protocol for connections</figcaption>
  <img src="/images/projects/secure-aws-load-balancer/cf-listener.png" style="max-width: 360px">
</figure>

<br>
<figure>
  <figcaption>
    CloudFormation infrastructure creation.
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/create-in-progress.png" style="max-width: 350px">
</figure>
<figure>
  <figcaption>
    Three instances created by the auto scaling group, across three availability zones.
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/three-instances.png" style="max-width: 650px">
</figure>
<figure>
  <figcaption>
    Secure listener created for HTTPS connections on port 443.
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/secure-listener.png" style="max-width: 600px">
</figure>
<figure>
  <figcaption>
    AWS security certificate.
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/security-cert.png" style="max-width: 500px">
</figure>
<figure>
  <figcaption>
    Route 53 alias record to route traffic to load balancer.
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/r53-record.png" style="max-width: 500px">
</figure>
<figure>
  <figcaption>
    Secure https connection..
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/secure-connection.png" style="max-width: 500px">
</figure>
<figure>
  <figcaption>
    Three instances across three availability zones.
  </figcaption>
  <img src="/images/projects/secure-aws-load-balancer/az-a.png" style="max-width: 600px">
</figure>
<figure>
  <img src="/images/projects/secure-aws-load-balancer/az-b.png" style="max-width: 600px">
</figure>
<figure>
  <img src="/images/projects/secure-aws-load-balancer/az-c.png" style="max-width: 600px">
</figure>

<style>
  figure img {
    background-color: #202830;
    padding: 10px 5px;
  }
</style>
