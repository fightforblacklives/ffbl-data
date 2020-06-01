type StateRepresentativeRole = {
  type: "state-representive";
  state: string;
  districts: string[];
};

type SenateRole = {
  type: "senate";
  state: string;
};

type Role = StateRepresentativeRole | SenateRole;

interface Person {
  name: string;
  roles: Role[];
  phone: string;
  email: string;
  twitter: string;
}

interface ZipCode {
  state: string;
  districts: string[];
}

interface MessageTemplate {
  channel: string;
  script: string;
}

type ZipCodeBundle = ZipCode & {
  people: Person[];
};
