import { UserConfig, RuleConfigSeverity } from "@commitlint/types";

const configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [RuleConfigSeverity.Error, "always", 50],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 72],
  },
};

export default configuration;
