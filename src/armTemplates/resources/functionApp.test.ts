import { FunctionAppResource } from "./functionApp";
import { ServerlessAzureConfig } from "../../models/serverless";

describe("Function App Resource", () => {
  const resourceGroupName = "myResourceGroup";
  const prefix = "prefix";
  const region = "westus";
  const stage = "prod";
  const customer = "mul05";
  const appName = "auth01";

  it("generates the correct resource name", () => {
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

    expect(FunctionAppResource.getResourceName(config)).toEqual(
      `${config.provider.prefix}-wus-${customer}${appName}-${stage}-fa`
    );
  });

  it("uses the specified name from the azure provider", () => {
    const serviceName = "myapp";

    const config: ServerlessAzureConfig = {
      provider: {
        apim: {
          name: ""
        },
        name: "azure",
        prefix,
        region,
        stage,
        customer,
        appName,
        resourceGroup: resourceGroupName,
        runtime: "nodejs10.x",
        functionApp: {
          name: serviceName,
        },
      },
      service: serviceName
    } as any;

    expect(FunctionAppResource.getResourceName(config)).toEqual(serviceName);
  });
});
