export type TPR_input ={
    periodFrom:string;
    periodUntil:string;
    taxID: string;
    fullName: string;
    countryCode: string;
    pkdCode: string;
    taxCategory: 'ZK01' | 'ZK02';
    operatingMargin: number;
    profitMargin: number;
    returnOnAssets: number;
    returnOnEquity: number;
    transactions: Array<transaction>
}

type transaction = {
    transactionCategory: string;
    subjectMatter: string;
    transactionValue: number;
    currencyCode: string;
    correction: 'KC01' | 'KC02';
    compensation: 'KS01' | 'KS02' | 'KS03';
    taxExemptionCode: 'ZW01' | 'ZW02';
}