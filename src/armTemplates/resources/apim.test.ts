import { ApimResource } from "./apim";
import { ServerlessAzureConfig } from "../../models/serverless";
import md5 from "md5";
import configConstants from "../../config";

describe("APIM Resource", () => {
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

    expect(ApimResource.getResourceName(config)).toEqual(
      `${prefix}-eus2-${customer}${appName}-${stage}-api`
    );
  });

  it("uses the specified name from the azure provider", () => {
    const apimName = "myAPIM";

    const config: ServerlessAzureConfig = {
      provider: {
        apim: {
          name: apimName
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

    expect(ApimResource.getResourceName(config)).toEqual(apimName);
  });
});
