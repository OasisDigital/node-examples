import yargs from 'yargs';

import { listResults, monitor } from './monitor';

export async function monitorCli(): Promise<void> {
  const argv = yargs
    .usage('Usage: $0 -f [str]')
    .describe({
      file:
        'Path to JSON file containing array of API URLs to monitor',
      concurrency: `Controls how many requests are run in parallel. Values are 'single', 'all', or 'limited'`,
      limit: `Max number of concurrent requests for 'limited' concurrency`,
    })
    .alias('f', 'file')
    .alias('c', 'concurrency')
    .alias('l', 'limit')
    .demandOption(['f']).argv;
  await monitor(argv.f as string, argv.c as string, argv.l as number);
}

export async function monitorResultsCli(): Promise<void> {
  await listResults();
}
