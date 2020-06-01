import * as fs from "fs";
import * as Path from "path";

const dir = (...subpath: string[]) => {
  return Path.resolve(__dirname, "..", ...subpath);
};

const zipCodes = fs.readdirSync(dir("zip-codes")).map((code) => {
  return code.slice(0, -".json".length);
});

const buildZipCodeBundle = (zip: string) => {
  const zipCodeInfo = require(dir("zip-codes", `${zip}.json`));

  const bundle = {
    zipCode: zip,
    ...zipCodeInfo,
  };

  fs.writeFileSync(
    dir("zip-code-bundles", `${zip}.json`),
    JSON.stringify(bundle, null, 2)
  );
};

fs.rmdirSync(dir("zip-code-bundles"));
fs.mkdirSync(dir("zip-code-bundles"));

zipCodes.forEach((code) => buildZipCodeBundle(code));
