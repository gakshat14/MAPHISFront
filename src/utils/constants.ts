import type { ILandingPageData, IRegisterResponse } from './model';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export enum sectionNames {
    researchers = 'Researchers',
    participating_institute = 'Participating Institute',
    About = 'About',
}

export const landingPageData: ILandingPageData = {
    researchers: [
        { name: 'Yanos Zylberberg', text: 'UK lead and PI' },
        { name: 'Laurent Gobillon', text: 'PSE-CNRS, France lead' },
        { name: 'Stephan Heblich', text: 'Toronto, Canada lead' },
        { name: 'Pierre-Philippe Combes', text: 'Sciences-Po, CO-I' },
        { name: 'Marcel Fortin', text: 'Toronto, CO-I' },
        { name: 'Emilien Valat', text: 'Research Associate' },
        { name: 'Steve Redding', text: 'Princeton' },
        { name: 'Gilies Duranton', text: 'Wharton UPenn' },
    ],
    participatingInstitute: [
        { name: 'University of Bristol', image: 'uob.png' },
        { name: 'University of Toronto', image: 'uot.png' },
        { name: 'anr', image: 'anr.png' },
        { name: 'ukri', image: 'ukri.png' },
    ],
};

export const initialRegisterObject: IRegisterResponse = { status: '', message: '', data: { userid: '' } };
