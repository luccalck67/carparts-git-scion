import { execFileSync } from 'node:child_process';

const log = execFileSync('git', ['log', '--format=%h %s'], { encoding: 'utf8' });
const entries = log.split('\n').filter(line => /^[a-f0-9]+ (feat|fix|docs|ci|test|chore|perf|refactor)(\([^)]+\))?!?: .+/.test(line));
console.log('# Changelog\n');
console.log(entries.map(line => `- ${line}`).join('\n') || 'Nenhum Conventional Commit neste historico.');
