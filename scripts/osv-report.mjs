import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function verifyReport(lock, report) {
  const expected = new Set(Object.entries(lock.packages).filter(([path]) => path !== '').map(([path, pkg]) => {
    if (!pkg.version || pkg.link) throw new Error(`Dependencia sem versao auditavel: ${path}`);
    return `${pkg.name || path.slice(path.lastIndexOf('node_modules/') + 13)}@${pkg.version}`;
  }));
  const groups = report.results;
  if (!Array.isArray(groups) || !groups.length) throw new Error('Relatorio OSV ausente ou vazio');
  const scanned = new Set();
  for (const group of groups) {
    for (const result of group.packages || []) {
      if (result.package?.ecosystem === 'npm') scanned.add(`${result.package.name}@${result.package.version}`);
      if (result.vulnerabilities?.length) throw new Error(`Vulnerabilidade detectada: ${result.package?.name}`);
    }
  }
  for (const dependency of expected) if (!scanned.has(dependency)) throw new Error(`Dependencia sem cobertura: ${dependency}`);
  if (!expected.size) throw new Error('Lockfile sem dependencias');
  return { expected: expected.size, scanned: scanned.size, vulnerabilities: 0 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  console.log(JSON.stringify(verifyReport(lock, report)));
}
