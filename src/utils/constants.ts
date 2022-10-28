import type { ILandingPageData, IRegisterResponse } from './model';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const sections = {
    about: { id: 'about', heading: 'About' },
    researcher: { id: 'researcher', heading: 'Researcher' },
    participatingInstitute: { id: 'participating_institute', heading: 'Participating Institute' },
};

export const landingPageData: ILandingPageData = {
    researchers: [
        { name: 'Yanos Zylberberg', designation: 'UK lead and PI' },
        { name: 'Laurent Gobillon', designation: 'PSE-CNRS, France lead' },
        { name: 'Stephan Heblich', designation: 'Toronto, Canada lead' },
        { name: 'Pierre-Philippe Combes', designation: 'Sciences-Po, CO-I' },
        { name: 'Marcel Fortin', designation: 'Toronto, CO-I' },
        { name: 'Emilien Valat', designation: 'Research Associate' },
        { name: 'Steve Redding', designation: 'Princeton' },
        { name: 'Gilies Duranton', designation: 'Wharton UPenn' },
    ],
    participatingInstitute: [
        { name: 'University of Bristol', image: 'uob.svg' },
        { name: 'University of Toronto', image: 'uot.png' },
        { name: 'anr', image: 'anr.jpg' },
        { name: 'ukri', image: 'ukri.png' },
    ],
};

export const initialRegisterObject: IRegisterResponse = { userid: '' };

export const geoJsonOptions = [
    { value: 'text', text: 'Text' },
    { value: 'vegetation', text: 'Trees' },
    { value: 'imprint', text: 'Buildings' },
];

export const region = [
    { value: 'Luton', text: 'Luton' },
    { value: 'york', text: 'york' },
];

// BAD Behaviour expected: had to remove - from Stoke-on-Trent
export const regionSize: Record<string, number[]> = {
    Barrow: [79800, 113850],
    Bedford: [45600, 53130],
    Birkenhead: [102600, 106260],
    Birmingham: [729600, 356730],
    Blackburn: [91200, 98670],
    Bolton: [68400, 106260],
    Bradford: [125400, 106260],
    Bristol: [171000, 151800],
    Burnley: [91200, 75900],
    Burton: [68400, 68310],
    Cardiff: [125400, 121440],
    Carlisle: [57000, 53130],
    Castleford: [45600, 30360],
    Rochester: [79800, 30360],
    Chester: [68400, 60720],
    Coventry: [102600, 98670],
    Crewe: [57000, 45540],
    Croydon: [45600, 68310],
    Darlington: [21600, 21600],
    Derby: [91200, 106260],
    Dover: [68400, 75900],
    Gateshead: [102600, 60720],
    Gloucester: [79800, 83490],
    Grimsby: [68400, 83490],
    Halifax: [57000, 75900],
    Huddersfield: [114000, 83490],
    Kingston: [159600, 129030],
    Ipswich: [114000, 75900],
    Wallsend: [159600, 60720],
    Keighley: [57000, 37950],
    Kidderminster: [68400, 45540],
    Leeds: [148200, 144210],
    Leicester: [114000, 121440],
    Lincoln: [45600, 106260],
    Liverpool: [205200, 280830],
    London: [658800, 388800],
    Luton: [34200, 37950],
    Macclesfield: [57000, 60720],
    Manchester: [193800, 212520],
    MerthyrTydvil: [86400, 100800],
    Middlesbrough: [32400, 28800],
    Newcastle: [171000, 151800],
    Newport: [79800, 113850],
    Northampton: [91200, 91080],
    Norwich: [91200, 75900],
    Nottingham: [193800, 273240],
    Oldham: [171000, 189750],
    Peterborough: [68400, 98670],
    Plymouth: [125400, 98670],
    Portsmouth: [79800, 113850],
    Preston: [171000, 68310],
    Reading: [68400, 45540],
    Rochdale: [68400, 98670],
    Sheerness: [43200, 36000],
    Sheffield: [205200, 227700],
    Southampton: [68400, 75900],
    Tynemouth: [410400, 204930],
    Stockport: [32400, 28800],
    Stockton: [68400, 68310],
    Stoke: [86400, 57600],
    Sunderland: [86400, 57600],
    Swansea: [57000, 68310],
    Swindon: [57000, 60720],
    Taunton: [68400, 75900],
    Walsall: [91200, 83490],
    Warrington: [91200, 83490],
    Wigan: [91200, 83490],
    Wolverhampton: [91200, 83490],
    Worcester: [91200, 98670],
    York: [91200, 98670],
    Demo: [34200, 22770],
};

export enum fillColor {
    vegetation = '#1dfd4d',
    imprint = '#fe0000',
    text = '#1e74fd',
}
