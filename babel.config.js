module.exports = {
    presets: [
        '@babel/typescript',
        [
            '@babel/env',
            {
                modules: process.env.BABEL_ENV === 'es' ? false : 'auto',
            },
        ],
        '@babel/react',
    ],
};
