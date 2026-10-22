import { execFileSync } from 'node:child_process';

const all = [
  { component: 'api', paths: 'apps/api\nlibs/ui' },
  { component: 'portal', paths: 'apps/portal\nlibs/ui' },
  { component: 'ui', paths: 'libs/ui' }
];

export function selectComponents(files, eventName = 'pull_request') {
  const unknownPath = files.some(file => !['apps/api/', 'apps/portal/', 'libs/ui/'].some(prefix => file.startsWith(prefix)));
  if (eventName !== 'pull_request' || unknownPath) return all.map(item => ({ ...item }));
  const selected = all.filter(({ component }) => files.some(file =>
    file.startsWith(component === 'ui' ? 'libs/ui/' : `apps/${component}/`) ||
    (component === 'portal' && file.startsWith('libs/ui/'))));
  return (selected.length ? selected : all).map(item => ({ ...item }));
}

export function changedFiles(base, head, cwd = process.cwd()) {
  if (![base, head].every(sha => /^[a-f0-9]{40}$/i.test(sha))) throw new TypeError('SHA de base ou HEAD invalido');
  return execFileSync('git', ['diff', '--no-renames', '--name-only', '-z', `${base}...${head}`], {
    cwd, encoding: 'utf8'
  }).split('\0').filter(Boolean);
}
