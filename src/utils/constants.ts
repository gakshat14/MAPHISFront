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
    { value: 'trees', text: 'Trees' },
    { value: 'building', text: 'Buildings' },
];
