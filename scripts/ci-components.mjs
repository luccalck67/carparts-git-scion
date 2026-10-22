const all = [
  { component: 'api', paths: 'apps/api\nlibs/ui' },
  { component: 'portal', paths: 'apps/portal\nlibs/ui' },
  { component: 'ui', paths: 'libs/ui' }
];

export function selectComponents(files, eventName = 'pull_request') {
  const globalChange = files.some(file => /^(package(-lock)?\.json|scripts\/|\.github\/|\.gitattributes|docs\/|prompts\/)/.test(file));
  if (eventName !== 'pull_request' || globalChange) return all.map(item => ({ ...item }));
  const selected = all.filter(({ component }) => files.some(file =>
    file.startsWith(component === 'ui' ? 'libs/ui/' : `apps/${component}/`) ||
    (component === 'portal' && file.startsWith('libs/ui/'))));
  return (selected.length ? selected : all).map(item => ({ ...item }));
}
