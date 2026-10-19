/* Lightweight self-contained source checks that do not need npm dependencies. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root=process.cwd();
const required=[
'app/layout.tsx','app/page.tsx','app/globals.css','lib/site-config.ts','components/MakeItRain.tsx',
'components/ClubDoor.tsx','components/Navigation.tsx','components/GrandTour.tsx',
'components/PosterWall.tsx','components/HowToBuy.tsx','components/CopyAddress.tsx',
'package.json','tailwind.config.ts','tsconfig.json',
];
let errors=0;
for(const filename of required) {
 if (!fs.existsSync(path.join(root,filename))) {errors++;console.error('MISSING',filename);}
}
const config=fs.readFileSync(path.join(root,'lib/site-config.ts'),'utf8');
if(!config.includes('chainId: 1')) { errors++;console.error('chainId must be 1 for Ethereum mainnet');}
if(/pump\.fun|Phantom or Solflare|Load SOL|Fair launch on Solana/.test(fs.readFileSync(path.join(root,'components/HowToBuy.tsx'),'utf8'))) {errors++;console.error('Solana-specific buy copy found');}
try {execFileSync(process.execPath,['scripts/check-assets.mjs'],{cwd:root,stdio:'inherit'});} catch {errors++;}
console.log(errors ? `${errors} validation problem(s)` : 'Project structure and reference checks passed.');
if(errors) process.exitCode=1;
