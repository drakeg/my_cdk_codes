import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const { Stack, App } = require('aws-cdk-lib');

class GADInfrastructureStack extends Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'GADVPC', {
      maxAzs: 2, // Adjust the number of Availability Zones as needed
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC, // Use public subnets for tasks that need internet access
          name: 'GADPublic',
        },
        {
          subnetType: ec2.SubnetType.PRIVATE, // Use private subnets for tasks that do not need internet access
          name: 'GADPrivate',
        },
      ],
    });

    // Create an ECS Cluster for Fargate
    new ecs.Cluster(this, 'GADFargateCluster', {
      vpc,
    });
  }
}

const app = new App();
new GADInfrastructureStack(app, 'GADInfrastructureStack');
