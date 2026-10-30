---
title: 'Secure and Scalable Azure VNet built using Terraform'
slug: azure-vnet-terraform
projectID: 'pr-azure-vnet'
homepage: false
visible: true
services: 'Azure - VNet, Terraform'
---

<div class="title-btn-row">
  <h2 style="text-wrap: balance; line-height: 2rem;">Creating a Secure and Scalable Azure VNet with Terraform</h2>
  <div class="title-btn-row-btns">
    <a href="/" class="btn">Home</a>
    <a href="/projects/" class="btn">Projects</a>
  </div>
</div>

This is an Azure Virtual Network (VNet) with public and private subnets set up using Terraform. This setup provides a secure and scalable network with internet access possible for both public and private instances.

Resources created include public and private subnets, route tables, an internet gateway, a NAT gateway and security groups to ensure a secure and scalable network environment, well-structured and ready for deployment.

<br>
<figure>
  <img src="../images/projects/azure-vnet-terraform/azurevnet.png" style="max-width: 500px; border: none;">
</figure>

<br>

### Services Used

<!-- VPC

Subnets

Route Tables

Internet Gateway

NAT Gateway

EC2

Terraform -->

<br>

### Steps Taken

i. Each resource in Azure must belong to a resource group. A resource group is a logical container that associates multiple resources so you can manage them as a single entity, based on lifecycle and security.

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/main-tf.png" style="max-width: 400px">
  <figcaption>
    Provider, Subscription and Resource Group
  </figcaption>
</figure>

<br>

ii. When creating a private network, you must use a CIDR block
from within the ranges of IP addresses reserved for private networks. 10.0.0.0/16 is within the ranges, and allows for upto 65,536 IP addresses.

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/vnet-tf.png" style="max-width: 500px">
  <figcaption>
    Virtual Network
  </figcaption>
</figure>

<br>

iii.

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/rt-tf.png" style="max-width: 500px">
  <figcaption>
    Public and Private Route Tables
  </figcaption>
</figure>

<br>

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/subnets-tf.png" style="max-width: 450px">
  <figcaption>
    
  </figcaption>
</figure>

<br>

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/ngw-tf.png" style="max-width: 450px">
  <figcaption>
    
  </figcaption>
</figure>

<br>

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/sg-tf.png" style="max-width: 450px">
  <figcaption>
    
  </figcaption>
</figure>

<br>

<figure class="add-border">
  <img src="../images/projects/azure-vnet-terraform/-tf.png" style="max-width: 450px">
  <figcaption>
    
  </figcaption>
</figure>

<br>

<style>
figure.add-border img {
  background-color:#282a36;
  padding: 15px;
}
</style>
