// @ts-check
/* eslint-disable node/global-require */
/* eslint-disable node/no-unpublished-require */

/* Note that this isn't pre-processed */
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD} = require('next/constants');

module.exports = (phase, { defaultConfig }) => {    
    /**
     * @type {import('next').NextConfig}
     **/
    const nextConfig = {
        extends: [
            'plugin:@next/next/recommended',
        ],
        reactStrictMode: true,
        swcMinify: true,

    };
    return nextConfig;
};
