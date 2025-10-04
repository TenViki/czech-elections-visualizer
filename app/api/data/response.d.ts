export interface ResponseData {
  message: string;
  data: Data;
}

export interface Data {
  results: Result[];
}

export interface Result {
  __typename: string;
  id: number;
  areaType: string;
  batchId: any;
  dateGenerated: number;
  electionId: number;
  finalData: boolean;
  subjectType: string;
  areaId: any;
  attendancePercent: number;
  processedPercent: number;
  specificResults: any;
  invalidVotes: number;
  invalidVotesPercent: number;
  validVotes: number;
  validVotesPercent: number;
  parties: Party[];
}

export interface Party {
  __typename: string;
  percent: number;
  subjectId: number;
  votes: number;
  id: number;
  fullName: string;
  color: string;
  textColor: string;
  isParticipating: boolean;
  abbreviation: string;
  customAbbreviation: string;
  customLongName: string;
  drawnPartyNumber: any;
  longName: string;
  partyCode: number;
  shortName: string;
  type: string;
  pastMandates: number;
  note: any;
  electionCounties: ElectionCounty[];
  nationalLeader: NationalLeader;
  subparties: Subparty[];
  mandates: number;
  candidates: any[];
}

export interface ElectionCounty {
  __typename: string;
  drawnPartyNumber: number;
  countyId: number;
  abbreviation: string;
  longName: string;
}

export interface NationalLeader {
  __typename: string;
  firstName: string;
  lastName: string;
  photo: Photo;
}

export interface Photo {
  __typename: string;
  id: number;
  src: string;
  title: string;
  crops: Crop[];
  publication: Publication;
}

export interface Crop {
  __typename: string;
  name: string;
  width: number;
  height: number;
  src: string;
  aspect: number;
}

export interface Publication {
  __typename: string;
  published: boolean;
}

export interface Subparty {
  __typename: string;
  id: number;
}
