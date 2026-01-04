import { UserConfig, RuleConfigSeverity } from "@commitlint/types";

const configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 72],
  },
};

export default configuration;
