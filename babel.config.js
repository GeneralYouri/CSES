module.exports = (api) => {
    // true when running tests via Jest
    // const isTest = api.env('test');

    api.cache(true);

    const plugins = [
        '@babel/plugin-proposal-class-properties',
    ];

    // Transpile to NodeJS v8.10, which is the version as supported by CSES
    const presets = [
        ['@babel/preset-env', {
            targets: { node: '8.10.0' },
            // debug: true,
            corejs: 3.8,
            useBuiltIns: 'usage',
        }],
    ];

    return {
        plugins,
        presets,
    };
};
