**Author:** mbandanixon@gmail.com

**Track:** GCP

**Project Category:** Education

**Group:** AG25 

Due to Lack of credit, i scripted my spin up approach on this Doc.


 | TECHNICAL REQUIREMENTS |
 | ----------------------- |

1. CI/CD pipeline to allow deployment of containers in sclalable enviroment.
2. Security and integrity of hosting enviroment.
3. Service avilability and reablity


# Approach

1. Develop App and its features.
2. Setup Docker configurations.
3. Implimenet github workflow action for Docker Image and store image in docker Hub.
4. Publish changes and capture latest Docker Image.
5. Set up compute service.
6. Configure database.
7. Connect and run application.



## Compute setup

***Set up a HTTP Load Balancer with Autoscaling configuration***

i) Configure a health check firewall rule

| Endpoint                | Method |
| ----------------------- | ------ |
Name	| fw-health-checks
Network	| default
Targets	| Specified target tags
Target tags	| allow-health-checks
Source filter	| IP Ranges
Source IP ranges	| 130.211.0.0/22
tcp | 80


ii) Create a NAT configuration
| Endpoint                | Method |
| ----------------------- | ------ |
Gateway name |	nat-config
Network	| default
Region	| us-central1
Cloud Router | cloud-router-1


iii) Create the main custom image

| Endpoint                | Method |
| ----------------------- | ------ |
Name |	**main-vm**
Region	| us-central1
Zone	| us-central1-a
Series |	E2
Machine type	| e2-small
Configure container | **supply latest image from Docker Hub**
 keep boot disk | true
Network tags | eanble-health-checks
Network interfaces | default
External IP | None

 | ***Customize the VM*** |

 - ## Install the psql client on the Compute Engine instance

    - sudo apt-get update
    - sudo apt-get install postgresql-client


 iv) Create a custom image

*Note:* Delete **main-vm** create above and keep its image alone.

| Endpoint                | Method |
| ----------------------- | ------ |
| Name |	**studyAppCustomImage**
| Source |	Disk
| Source disk |	**main-vm**


v) Configure an instance template

| Endpoint                | Method |
| ----------------------- | ------ |
Name | instance-template-1
Series |	E2
Machine type	| e2-small
Custom Boot disk | **studyAppCustomImage**
Network tags | eanble-health-checks


vi) Create the managed instance
| Endpoint                | Method |
| ----------------------- | ------ |
Name	| **managed-instance-1**
Location |	Multiple zones
Region	| us-central1
Instance template |	instance-template-1
Minimum number of instances | 	1
Maximum number of instances | 3
HTTP load balancing utilization | 80
 Cool down period | 40
 **Create a health check**
Name	| http-health-check
Protocol |	TCP
Port	| 80


vii) Configure the HTTP load balancer

| Endpoint                | Method |
| ----------------------- | ------ |
Name | http-load-balancing
**Backend configuration**
Name	| http-backend
Backend type |	Instance group
Instance group |	**managed-instance-1**
Port numbers	| 80
Balancing mode	| Rate
Maximum RPS	 65
Capacity	| 100
**Configure the frontend**
Protocol	| HTTP
IP version	| IPv4
IP address	| Ephemeral
Port	| 80



 
## Database setup
 We connect to SQL through internal IP for privacy and security benefits.

 ***Flow***

    - Create a Cloud SQL database
    - Connect an application to Cloud SQL using Private IP address

| Endpoint                | Method |
| ----------------------- | ------ |
database engine | postgresql
Instance ID |	study-app-db
version | 13
Password	| password
Region	| us-central1
Zone	| Single
Database Version	| MySQL 5.*
**create database** |
**create user account** |

    - Connect to database
- psql -h CLOUD_SQL_PRIVATE_IP_ADDRESS -U USERNAME

 

