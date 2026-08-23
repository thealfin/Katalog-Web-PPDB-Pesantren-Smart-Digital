import AdmZip from 'adm-zip';
import { join } from 'node:path';

const baseDir = join(process.cwd(), 'public', 'templates');
const templateDir = join(baseDir, 'abu-formal');
const zip = new AdmZip();
zip.addLocalFolder(templateDir);
zip.writeZip(join(baseDir, `abu-formal.zip`));
console.log('Zipped abu-formal successfully.');
