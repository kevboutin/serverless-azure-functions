import { HostingEnvironmentResource } from "./hostingEnvironment";
import { ServerlessAzureConfig } from "../../models/serverless";
import md5 from "md5";
import configConstants from "../../config";

describe("Azure Hosting Environment Resource", () => {
  const resourceGroupName = "myResourceGroup";
  const prefix = "prefix";
  const region = "eastus2";
  const stage = "prod";
  const customer = "mul05";
  const appName = "auth01";

  it("generates the correct resource name", () => {
    //const resourceGroupHash = md5(resourceGroupName).substr(
    //  0,
    //  configConstants.resourceGroupHashLength
    //);

    const config: ServerlessAzureConfig = {
      provider: {
        name: "azure",
        prefix,
        region,
        stage,
        customer,
        appName,
        resourceGroup: resourceGroupName,
        runtime: "nodejs10.x"
      },
      service: ""
    } as any;

    expect(HostingEnvironmentResource.getResourceName(config)).toEqual(
      `${prefix}-eus2-${customer}${appName}-${stage}-ase`
    );
  });

  it("uses the specified name from the azure provider", () => {
    const hostingEnvironmentName = "myHostingEnv";

    const config: ServerlessAzureConfig = {
      provider: {
        hostingEnvironment: {
          name: hostingEnvironmentName
        },
        name: "azure",
        prefix,
        region,
        stage,
        customer,
        appName,
        resourceGroup: resourceGroupName,
        runtime: "nodejs10.x"
      },
      service: ""
    } as any;

    expect(HostingEnvironmentResource.getResourceName(config)).toEqual(hostingEnvironmentName);
  });
});
