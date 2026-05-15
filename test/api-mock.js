// test/api-mock.js

(function () {
    const FS = {
        'uploads': {
            folders: ['articles', 'covers', 'docs'],
            files: [
                {name: 'photo1.jpg', url: 'https://picsum.photos/seed/p1/400/300'},
                {name: 'photo2.jpg', url: 'https://picsum.photos/seed/p2/400/300'},
                {name: 'banner.png', url: 'https://picsum.photos/seed/p3/800/200'},
            ],
        },
        'uploads/articles': {
            folders: ['2024', '2025'],
            files: [
                {name: 'hero.jpg', url: 'https://picsum.photos/seed/a1/600/400'},
                {name: 'thumb.jpg', url: 'https://picsum.photos/seed/a2/300/300'},
            ],
        },
        'uploads/articles/2024': {
            folders: [],
            files: [
                {name: 'jan.jpg', url: 'https://picsum.photos/seed/j1/400/300'},
                {name: 'feb.jpg', url: 'https://picsum.photos/seed/j2/400/300'},
            ],
        },
        'uploads/articles/2025': {
            folders: [],
            files: [
                {name: 'spring.jpg', url: 'https://picsum.photos/seed/s1/400/300'},
            ],
        },
        'uploads/covers': {
            folders: [],
            files: [
                {name: 'cover1.jpg', url: 'https://picsum.photos/seed/c1/600/800'},
                {name: 'cover2.jpg', url: 'https://picsum.photos/seed/c2/600/800'},
            ],
        },
        'uploads/docs': {
            folders: [],
            files: [
                {name: 'scheme.png', url: 'https://picsum.photos/seed/d1/800/600'},
            ],
        },
    };

    function buildBreadcrumb(path) {
        const parts = path.split('/').filter(Boolean);
        const crumbs = [];
        let current = '';
        for (const part of parts) {
            current = current ? current + '/' + part : part;
            crumbs.push({label: part, path: current});
        }
        return crumbs;
    }

    function browseResponse(path) {
        const node = FS[path] || {folders: [], files: []};
        return {
            breadcrumb: buildBreadcrumb(path),
            folders: node.folders.map(name => ({
                name,
                path: path + '/' + name,
            })),
            files: node.files.map(f => ({
                name: f.name,
                path: path + '/' + f.name,
                url: f.url,
            })),
        };
    }

    function uploadResponse(path, filename) {
        const url = 'https://picsum.photos/seed/' + filename + '/400/300';
        if (!FS[path]) FS[path] = {folders: [], files: []};
        FS[path].files.push({name: filename, url});
        return {path: path + '/' + filename, url, name: filename};
    }

    const realFetch = window.fetch.bind(window);

    window.fetch = function (input, init) {
        const url = typeof input === 'string' ? input : input.url;
        const method = (init?.method || 'GET').toUpperCase();

        if (method === 'GET' && url.includes('/admin/file-browser/browse')) {
            const path = new URL(url, location.href).searchParams.get('path') || 'uploads';
            console.log('[mock] browse', path);
            return Promise.resolve(new Response(
                JSON.stringify(browseResponse(path)),
                {status: 200, headers: {'Content-Type': 'application/json'}},
            ));
        }

        // POST /admin/file-browser/upload
        if (method === 'POST' && url.includes('/admin/file-browser/upload')) {
            return (init?.body instanceof FormData
                    ? Promise.resolve(init.body.get('file')?.name || 'upload.jpg')
                    : Promise.resolve('upload.jpg')
            ).then(filename => {
                const folder = init?.body instanceof FormData
                    ? (init.body.get('folder') || 'uploads')
                    : 'uploads';
                console.log('[mock] upload', folder, filename);
                return new Response(
                    JSON.stringify(uploadResponse(folder, filename)),
                    {status: 200, headers: {'Content-Type': 'application/json'}},
                );
            });
        }

        return realFetch(input, init);
    };

    console.info('[api-mock] fetch interceptor active');
})();