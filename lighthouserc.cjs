module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --host 127.0.0.1',
      url: [
        'http://127.0.0.1:4321/yifu-zhang/',
        'http://127.0.0.1:4321/yifu-zhang/blog/',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:accessibility': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:best-practices': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:seo': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'total-byte-weight': [
          'error',
          { maxNumericValue: 307200, aggregationMethod: 'median-run' },
        ],
      },
    },
  },
};
