module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --host 127.0.0.1',
      startServerReadyPattern: 'Preview server running at',
      url: ['http://127.0.0.1:4321/yifu-zhang/'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'total-byte-weight': ['error', { maxNumericValue: 307200 }],
      },
    },
  },
};
