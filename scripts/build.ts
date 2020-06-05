import * as fs from "fs";
import * as Path from "path";

const dir = (...subpath: string[]) => {
  return Path.resolve(__dirname, "..", ...subpath);
};

const zipCodes = require(dir("locations.json"));

const contacts = fs.readdirSync(dir("contacts")).map((file) => {
  return require(dir("contacts", file));
});

const buildZipCodeBundle = (location: any) => {
  const zip = location.zipCode;

  const stateReps = contacts.filter(
    (x) =>
      x.type === "State Representative" &&
      x.state === location.state &&
      location.stateLowerDistrict === x.district
  );

  const stateSenators = contacts.filter(
    (x) =>
      x.type === "State Senator" &&
      x.state === location.state &&
      location.stateUpperDistrict === x.district
  );

  const usRepresentatives = contacts.filter(
    (x) =>
      x.type === "US Representative" &&
      x.state === location.state &&
      location.congressionalDistrict.includes(x.district)
  );

  const usSenators = contacts.filter(
    (x) => x.type === "US Senator" && x.state === location.state
  );

  const governor = contacts.filter(
    (x) => x.type === "Governor" && x.state === location.state
  );

  const mayor = contacts.filter(
    (x) =>
      x.type === "Mayor" &&
      x.state === location.state &&
      x.city === location.city
  );

  const people = [
    ...stateReps,
    ...stateSenators,
    ...usRepresentatives,
    ...usSenators,
    ...governor,
    ...mayor,
  ];

  const bundle = {
    ...location,
    people,
  };

  fs.writeFileSync(
    dir("zip-code-bundles", `${zip}.jsonp`),
    `callback(${JSON.stringify(bundle, null, 2)})`
  );
};

fs.rmdirSync(dir("zip-code-bundles"), { recursive: true });
fs.mkdirSync(dir("zip-code-bundles"));

zipCodes.forEach(buildZipCodeBundle);
