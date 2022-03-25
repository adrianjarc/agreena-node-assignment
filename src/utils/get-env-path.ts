export default () => `.env.${process.env.STAGE ? process.env.STAGE : 'local'}`;
