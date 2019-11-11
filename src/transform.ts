import {IconDefinition} from '@ant-design/icons-angular/src/types';
import lodash from 'lodash';
import {execSync} from 'child_process';
import {readFileSync, writeFileSync} from 'fs';
import {compile} from 'handlebars';

interface IIconMap {
  [key: string]: IconDefinition;
}

const iconMap: IIconMap = {};

const execOptions = {
  encoding: 'utf-8',
};

execSync('rm -rf ./icons/*');

execSync('echo material-design-icons/*/svg/production/ic_*.svg', execOptions)
  .toString()
  .trim()
  .split(/\s+/)
  .filter((icon: string) => icon.indexOf('px.svg') > 0)
  .map((icon: string): IconDefinition => {
    const iconDefinition: IconDefinition = {
      name: `mat_${icon.replace(/^material-design-icons\/([a-z0-9]+)\/svg\/([a-z0-9]+)\/ic_([a-z0-9_]+)_([0-9]+)px\.svg$/, '$3')}`,
      theme: 'outline',
      icon: readFileSync(icon).toString(),
    };
    const name: string = lodash.camelCase(iconDefinition.name);
    const className: string = `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
    iconMap[className] = iconDefinition;
    return iconDefinition;
  });

const iconTemplate = compile(readFileSync('src/templates/icon.hbs', 'utf-8'));
const icons: Array<{
  icon: IconDefinition,
  className: string,
}> = Object
  .entries(iconMap)
  .map(([className, icon]) => {
    const content: string = iconTemplate({
      className,
      icon,
    });
    writeFileSync(`./icons/${className}.ts`, content);
    return {
      icon,
      className,
    };
  });

const indexTemplate = compile(readFileSync('./src/templates/index.hbs', 'utf-8'));
writeFileSync('./icons/public.ts', indexTemplate({
  icons,
}));
