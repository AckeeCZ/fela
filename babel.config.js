module.exports = {
    presets: [
        [
            '@babel/typescript',
            {
                onlyRemoveTypeImports: true,
                allowDeclareFields: true,
            },
        ],
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};
