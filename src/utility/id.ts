const toID = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '');

export default toID;
