/**
 * Blue Frameworks
 * Spring Framework 5
 *
 * OpenAPI spec version: 1.0
 * Contact: luke.petzer@younglings.africa
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Timestamp } from './timestamp';


export interface OnlineRegistrationDTO {
    accPeriod?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    birthDate?: string;
    commsInd?: number;
    countryCode?: string;
    /**
     * /api/v1/countrycodes for values(1-252).
     */
    countryCodeId?: number;
    countryId?: number;
    createOpr?: string;
    createdDate?: Timestamp;
    editDate?: Timestamp;
    editOpr?: string;
    email?: string;
    ethnicGroupId?: number;
    firstContactEmail?: string;
    firstContactMobile?: string;
    firstContactName?: string;
    firstContactRelationship?: number;
    firstName?: string;
    gender?: number;
    hashSearch?: string;
    hlaConfirm?: number;
    homePhone?: string;
    id?: number;
    idNumber?: string;
    idType?: number;
    mobile?: string;
    newsLetter?: number;
    p1?: number;
    p10?: number;
    p2?: number;
    p3?: number;
    p4?: number;
    p5?: string;
    p6?: number;
    p7?: number;
    p8?: number;
    p9?: number;
    postalCode?: string;
    provinceId?: number;
    q1_1?: number;
    q1_10?: number;
    q1_11a?: number;
    q1_11b?: number;
    q1_11c?: number;
    q1_11d?: number;
    q1_12a?: number;
    q1_12b?: number;
    q1_12c?: string;
    q1_2?: number;
    q1_3?: number;
    q1_4?: number;
    q1_5?: string;
    q1_6?: string;
    q1_7?: number;
    q1_8?: number;
    q1_9?: number;
    q2_1?: number;
    q2_10?: number;
    q2_10a?: string;
    q2_11?: number;
    q2_11a?: string;
    q2_12?: number;
    q2_12a?: string;
    q2_13?: number;
    q2_13a?: string;
    q2_14?: number;
    q2_14a?: string;
    q2_15?: number;
    q2_15a?: string;
    q2_1a?: string;
    q2_1b?: string;
    q2_2?: number;
    q2_2a?: string;
    q2_3?: number;
    q2_3a?: string;
    q2_4?: number;
    q2_5?: number;
    q2_5a?: string;
    q2_6?: number;
    q2_6a?: string;
    q2_6b?: string;
    q2_7?: number;
    q2_7a?: string;
    q2_8?: number;
    q2_8a?: string;
    q2_9?: number;
    q2_9a?: string;
    recruitmentInd?: number;
    refNo?: string;
    regType?: string;
    regTypeId?: number;
    region?: string;
    result?: string;
    secondContactEmail?: string;
    secondContactMobile?: string;
    secondContactName?: string;
    secondContactRelationship?: number;
    sffStaff?: number;
    status?: number;
    stemCellConfirm?: number;
    surname?: string;
    sysField?: number;
    titleId?: number;
    vettedRegistrationNo?: string;
    webVisible?: number;
    workPhone?: string;
}
