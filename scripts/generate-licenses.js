const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const OUTPUT = path.join(ROOT, 'LICENSES-THIRD-PARTY.txt');

const LICENSE_FILES = [
    'LICENSE', 'LICENSE.md', 'LICENSE.txt',
    'license', 'license.md', 'license.txt',
    'LICENCE', 'LICENCE.md', 'LICENCE.txt',
];

function readJson(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return null;
    }
}

function findLicenseText(pkgDir) {
    for (const name of LICENSE_FILES) {
        const full = path.join(pkgDir, name);
        if (fs.existsSync(full)) return fs.readFileSync(full, 'utf8').trim();
    }
    return null;
}

function collectPackages() {
    const packages = [];
    const scopes = fs.readdirSync(NODE_MODULES).filter(f => f.startsWith('@'));
    const plain = fs.readdirSync(NODE_MODULES).filter(f => !f.startsWith('@') && !f.startsWith('.'));

    const dirs = [
        ...plain.map(n => path.join(NODE_MODULES, n)),
        ...scopes.flatMap(scope =>
            fs.readdirSync(path.join(NODE_MODULES, scope))
                .map(n => path.join(NODE_MODULES, scope, n))
        ),
    ];

    for (const dir of dirs) {
        const pkgPath = path.join(dir, 'package.json');
        const pkg = readJson(pkgPath);
        if (!pkg) continue;

        packages.push({
            name: pkg.name || path.relative(NODE_MODULES, dir),
            version: pkg.version || 'unknown',
            license: pkg.license || 'unknown',
            repository: pkg.repository?.url || pkg.repository || '',
            text: findLicenseText(dir),
        });
    }

    return packages.sort((a, b) => a.name.localeCompare(b.name));
}

function format(packages) {
    const header = [
        'THIRD-PARTY LICENSES',
        '====================',
        `Generated: ${new Date().toISOString()}`,
        `Total packages: ${packages.length}`,
        '',
        'This file lists all third-party packages bundled in this software',
        'along with their respective licenses.',
        '',
        '='.repeat(80),
        '',
    ].join('\n');

    const body = packages.map(p => [
        `Package:    ${p.name}`,
        `Version:    ${p.version}`,
        `License:    ${p.license}`,
        p.repository ? `Repository: ${p.repository}` : '',
        '',
        p.text || '(license text not found — see package repository)',
        '',
        '-'.repeat(80),
        '',
    ].filter(l => l !== undefined).join('\n')).join('\n');

    return header + body;
}

const packages = collectPackages();
const content = format(packages);

fs.writeFileSync(OUTPUT, content, 'utf8');
console.log(`✓ Generated ${OUTPUT}`);
console.log(`  ${packages.length} packages listed`);

const summary = {};
for (const p of packages) {
    const lic = String(p.license);
    summary[lic] = (summary[lic] || 0) + 1;
}
console.log('\nLicense summary:');
Object.entries(summary)
    .sort((a, b) => b[1] - a[1])
    .forEach(([lic, count]) => console.log(`  ${count.toString().padStart(4)}  ${lic}`));
