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
    en_US: string
    de_DE: string
  }
  
  export interface Summary {
    localStrings: LocalStrings2
  }
  
  export interface LocalStrings2 {
    en_US: string
    de_DE: string
  }
  
  export interface Description {
    localStrings: LocalStrings3
  }
  
  export interface LocalStrings3 {
    en_US: string
    de_DE: string
  }
  
  export interface Icon {
    url: string
    type: string
  }
  
  export interface Category {
    name: Name2
    summary: any
    description: any
    cname: string
  }
  
  export interface Name2 {
    localStrings: LocalStrings4
  }
  
  export interface LocalStrings4 {
    en_US: string
  }
  
  export interface Attachment {
    name: Name3
    summary: any
    description: any
    uri: string
  }
  
  export interface Name3 {
    localStrings: LocalStrings5
  }
  
  export interface LocalStrings5 {
    en_US: string
  }
  
  export interface MaturityStatu {
    name: Name4
    summary: any
    description: any
    cname: string
  }
  
  export interface Name4 {
    localStrings: LocalStrings6
  }
  
  export interface LocalStrings6 {
    en_US: string
  }
  
  export interface Policy {
    name: Name5
    summary: Summary2
    description: Description2
    categories: any[]
    providerRef: any
  }
  
  export interface Name5 {
    localStrings: LocalStrings7
  }
  
  export interface LocalStrings7 {
    en_US: string
  }
  
  export interface Summary2 {
    localStrings: LocalStrings8
  }
  
  export interface LocalStrings8 {
    en_US: string
  }
  
  export interface Description2 {
    localStrings: LocalStrings9
  }
  
  export interface LocalStrings9 {
    en_US: string
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
  