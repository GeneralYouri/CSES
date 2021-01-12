module.exports = (api) => {
    // true when running tests via Jest
    // const isTest = api.env('test');

    api.cache(true);

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-root-import',
    ];

    // Transpile to NodeJS v8.10, which is the version as supported by CSES
    const presets = [
        ['@babel/preset-env', {
            targets: { node: '8.10.0' },
            corejs: 3.8,
            useBuiltIns: 'usage',
            // debug: true,
        }],
    ];

    return {
        plugins,
        presets,
    };
};
