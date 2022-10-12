export class AllData {
    name: Name
    summary: Summary
    description: Description
    owner: string
    id: string
    modified: number
    created: any
    documentType: string
    externalRefKey: string
    providerRef: string
    type: string
    version: string
    icon: Icon
    systemVersion: string
    versionFamilyRef: string
    latest: string
    follower: any
    providerType: any
    viewType: any
    tags: string[]
    communities: string[]
    categories: Category[]
    businessTerms: any[]
    endPoints: any[]
    attachments: Attachment[]
    maturityStatus: MaturityStatu[]
    policies: Policy[]
    apiProperties: any[]
    securitySchemes: SecurityScheme[]
    scopes: any[]
    endpointIds: string[]
    rating: number
    consumes: string[]
    produces: string[]
    resources: any[]
    parameters: any[]
    soapMethods: any[]
    components: any[]
    resourceIds: string[]
    soapMethodIds: any[]
    componentIds: string[]
    hybrid: boolean
  }
  
  export interface Name {
    localStrings: LocalStrings
  }
  
  export interface LocalStrings {
    en_US : string;
    de_DE : string;
    ru_RU : string;
    fr_FR : string;
    es_ES : string;
    jp_JP : string;
  }
  export type LEExcludingBox = Exclude<keyof LocalStrings, 'ab_ab'>;
  
  export interface Summary {
    localStrings: LocalStrings
  }
  
  
  export interface Description {
    localStrings: LocalStrings
  }
  
  export interface Icon {
    url: string
    type: string
  }
  
  export interface Category {
    name: Name
    summary: any
    description: any
    cname: string
  }
  
  export interface Attachment {
    name: string
    summary: any
    description: any
    uri: string
  }
  
  export interface MaturityStatu {
    name: Name
    summary: any
    description: any
    cname: string
  }
  
  export interface Policy {
    name: Name
    summary: Summary
    description: Description
    categories: any[]
    providerRef: any
  }
  
  export interface SecurityScheme {
    type: string
    description: any
    name?: string
    $ref: any
    in?: string
    scheme: any
    bearerFormat: any
    flows: any
    openIdConnectUrl: any
  }
  
  // export class AllLocales {
  //   "de_DE": string;
  //   "en_US": string;
  //   "ru_RU": string;
  //   "fr_FR": string;
  // }