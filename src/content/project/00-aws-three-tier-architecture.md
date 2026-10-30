---
title: 'Production-Grade AWS Three-Tier Architecture with Terraform'
slug: aws-three-tier-architecture
projectID: 'pr-3-tier-arch'
homepage: true
visible: true
services: 'AWS - VPC, EC2, Terraform'
---

<div class="title-btn-row">
  <h2>Production-Grade AWS Three-Tier Architecture with Terraform</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

<!-- This project showcases a highly available and scalable three-tier cloud architecture deployed on AWS across two Availability Zones. The architecture prioritizes security and fault tolerance, beginning with a public subnet housing two EC2 instances configured for internet access. These instances act as a bastion layer, controlling outbound internet connectivity for the second tier. This private subnet contains two further EC2 instances dedicated to application processing, ensuring sensitive operations are isolated from direct external access. Finally, the architecture incorporates a third tier consisting of RDS databases, providing persistent data storage.

To ensure both high availability and scalability, load balancing is implemented across all EC2 instances within each tier, distributing traffic efficiently. Auto-scaling is also employed, dynamically adjusting the number of instances based on demand and ensuring consistent performance even during peak usage. Security is a paramount concern, addressed through the implementation of security groups to control both inbound and outbound traffic at the instance level, effectively isolating and protecting each tier of the architecture. This multi-layered approach promotes a robust and secure cloud environment. -->

Highly available, scalable, and secure three-tier application infrastructure across three availability zones — built with Terraform, incorporating defense-in-depth security controls including NACLs, VPC Flow Logs, SSM Session Manager, GuardDuty and AWS Config.

<br>

<figure>
  <img src="/images/projects/aws-architecture/aws-architecture.png" style="max-width: 500px; border: none; background: none; padding: 0">
</figure>

<br>

### Services Used

<!-- VPC - Subnets, Route Tables, Internet Gateway, NAT Gateway, Elastic IP

EC2 - Security Groups, Auto Scaling, Elastic Load Balancing -->

AWS Services:
VPC, Subnets (public/private/isolated), Internet Gateway, NAT Gateway, Route Tables, Network ACLs, VPC Flow Logs, VPC Endpoints (Gateway + Interface), EC2, ECS (EC2-backed), ECR, Auto Scaling Groups, Application Load Balancer (external + internal), RDS Aurora (Multi-AZ, read replicas, autoscaling), ElastiCache (Redis), EFS, S3, CloudFront, WAF, Shield, Route 53, ACM, SSM Session Manager, SQS, CloudWatch, SNS, KMS, IAM, GuardDuty, AWS Config, CloudTrail, Secrets Manager, Security Hub
IaC / DevOps:
Terraform, Terraform remote state (S3 + DynamoDB locking)
Protocols / Concepts:
HTTPS/TLS (443), HTTP (80), MySQL (3306), Redis (6379), Flask/app port (5000), SSL termination, Defense-in-depth, Multi-AZ HA, Least privilege IAM, Encryption at rest + in transit, Stateful vs stateless firewalling (SGs vs NACLs)
Demo stack:
Nginx, EC2 user data (instance metadata), bash scripting
DNS / Certs:
Route 53, ACM

<br>

### Steps Taken

<!-- <br> -->
<figure>
  <figcaption>Provider, region and statement to allow access to all availability zones in region.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/main.png" style="max-width: 320px">
</figure><br />
<figure>
  <figcaption>VPC with CIDR block of 10.0.0.0/16, within the RFC 1918 ranges of IP addresses reserved for private networks.
  </figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/vpc.png" style="max-width: 230px">
</figure><br />
<figure>
  <figcaption>I used the Terraform cidrsubnet() function to dynamically generate the subnets. The '8' value means 8 bits are added to the prefix length, resulting in '/24' subnets. The count value specifies how many subnets to create, and when used in the function, <em>which</em> subnets to create.  </figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/subnets.png" style="max-width: 640px">
</figure><br />
<figure>
  <figcaption>The public route table provides a route to the internet using the internet gateway, it is then explicitly associated with the public subnets. The private route table provides a route to the internet by using the NAT gateway in the public subnet. The private route table is then explicitly associated with the private subnets.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/rt.png" style="max-width: 440px">
</figure><br />
<figure>
  <figcaption>Internet Gateway in the VPC; NAT Gateway in a public subnet; the NAT Gateway requires a static, elastic IP.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/gw.png" style="max-width: 320px">
</figure><br />
<figure>
  <figcaption>The auto scaling group requires a launch template. The launch template defines which machine image to use for the created EC2 instance and which security group to assign to it. In the public launch template, the instances will be automatically assigned public IP addresses. The auto scaling desired capacity is set to 2. The vpc_zone_identifier statement specifies the available subnets created using the cidrsubnet function.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/lt-asg-pub.png" style="max-width: 450px">
</figure><br />
<figure>
  <figcaption>In the private auto scaling group the vpc_zone_identifier statement specifies the first and second of the created private subnets. The third and fourth private subnets will be used for the RDS database.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/lt-asg-pri.png" style="max-width: 450px">
</figure><br />
<figure>
  <figcaption>The load balancers for the public and private subnets are both Application Load Balancers, used for distributing HTTP and HTTPS traffic across multiple targets, including EC2 instances. The public load balancer serves internet-facing traffic, the private load balancer serves internal traffic.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/lb.png" style="max-width: 470px">
</figure><br />
<figure>
  <figcaption>These security group rules configure inbound and outbound network traffic for the public EC2 instances. Inbound, the rules permit HTTP traffic on port 80 from any IP address (0.0.0.0/0) and SSH traffic on port 22 from the CIDR block of the VPC. Outbound, the rules allow all traffic (all ports and protocols) to any destination.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/sg-pub.png" style="max-width: 350px">
</figure><br />
<figure>
  <figcaption>These security group rules for private EC2 instances significantly enhance security compared to the prior configuration by restricting both SSH and HTTP access exclusively to the VPC's CIDR block. This isolates instances from the public internet, reducing the attack surface.  Outbound traffic remains open, allowing instances to initiate outbound connections to the internet through the NAT Gateway.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/sg-pri.png" style="max-width: 350px">
</figure><br />
<figure>
  <figcaption>This sets up two MySQL database instances on AWS RDS, along with the necessary networking components. The RDS subnet group consists of the third and fourth of the private subnets. Each instance has 20GB of gp2 storage, runs MySQL 8.0.40, uses the db.t3.micro instance class, is named "mydb", uses the username "admin" and a password of "password" (not recommended).
  
  The security group rules allow inbound TCP traffic on port 3306 (the default MySQL port) from within the VPC's CIDR block, and all outbound traffic. This code creates two small, identical MySQL database servers for development or testing, properly secured and placed within the VPC.</figcaption>
  <img src="/images/projects/aws-architecture/tf-imgs/rds-sub.png" style="max-width: 420px">
</figure>
<figure>
  <img src="/images/projects/aws-architecture/tf-imgs/rds-sg.png" style="max-width: 360px">
</figure>
<figure>
  <img src="/images/projects/aws-architecture/tf-imgs/rds-in.png" style="max-width: 480px">
</figure>
<br>

---

<br>

### Selection of infrastructure running in AWS Console after running Terraform apply

<figure class="console-img">
  <figcaption>After running 'terraform init / plan / apply' in the CLI, the infrastructure is built within 4-5 minutes</figcaption>
  <img src="/images/projects/aws-architecture/tf-apply.png" style="max-width: 400px">
</figure>
<figure class="console-img">
  <figcaption>VPC layout</figcaption>
  <img src="/images/projects/aws-architecture/vpc-layout.png" style="max-width: 700px">
</figure>
<figure class="console-img">
  <figcaption>Private and public subnets</figcaption>
  <img src="/images/projects/aws-architecture/all-subnets.png" style="max-width: 700px">
</figure>
<figure class="console-img">
  <figcaption>Private and public load balancers</figcaption>
  <img src="/images/projects/aws-architecture/load-balancers.png" style="max-width: 750px">
</figure>
<figure class="console-img">
  <figcaption>NAT Gateway with Elastic IP</figcaption>
  <img src="/images/projects/aws-architecture/ngw-eip.png" style="max-width: 600px">
</figure>
<figure class="console-img">
  <figcaption>RDS instances</figcaption>
  <img src="/images/projects/aws-architecture/rds-instances.png" style="max-width: 550px">
</figure>
<figure class="console-img">
  <figcaption>RDS security group</figcaption>
  <img src="/images/projects/aws-architecture/rds-sg.png" style="max-width: 550px">
</figure>
<figure class="console-img">
  <figcaption>Public security group</figcaption>
  <img src="/images/projects/aws-architecture/public-sg.png" style="max-width: 550px">
</figure>
<figure class="console-img">
  <figcaption>Private security group</figcaption>
  <img src="/images/projects/aws-architecture/private-sg.png" style="max-width: 550px">
</figure>
<figure class="console-img">
  <figcaption>Run 'terraform destroy' in the CLI and the entire created infrastructure is removed</figcaption>
  <img src="/images/projects/aws-architecture/tf-destroy.png" style="max-width: 400px">
</figure>

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
