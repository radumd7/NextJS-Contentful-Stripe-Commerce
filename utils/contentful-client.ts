import { createClient } from 'contentful';

const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS} = process.env;

const contentfulClient = createClient({
    space: CONTENTFUL_SPACE as string,
    accessToken: CONTENTFUL_ACCESS as string
});

export default contentfulClient;