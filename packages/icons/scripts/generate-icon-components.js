const path = require('path');
const glob = require('glob-promise');
const fs = require('fs');
const { promisify } = require('util');
const cheerio = require('cheerio');
const camelcase = require('camelcase');

const writeFile = promisify(fs.writeFile);
const exec = promisify(require('child_process').exec);

const mkdir = promisify(fs.mkdir);
const appendFile = promisify(fs.appendFile);
const rmdir = promisify(fs.rm);
const rootDir = path.resolve(__dirname, '../');

const writeComponent = (filePath, content) =>
  writeFile(path.resolve(rootDir, filePath), content, 'utf8');

const appendComponent = (filePath, content) =>
  appendFile(path.resolve(rootDir, filePath), content, 'utf8');

function attrConverter(attribs, tagName, hasColor) {
  return (
    attribs &&
    Object.keys(attribs)
      .filter(
        name =>
          ![
            'class',
            ...(tagName === 'svg' ? ['xmlns', 'xmlns:xlink', 'xml:space', 'width', 'height'] : []),
          ].includes(name),
      )
      .reduce((obj, name) => {
        const newName = camelcase(name);
        const objAttr = obj;
        switch (newName) {
          case 'fill':
            objAttr[newName] = hasColor
              ? attribs[name]
              : attribs[name] === 'none'
              ? attribs[name]
              : 'currentColor';
            break;
          default:
            objAttr[newName] = attribs[name];
            break;
        }
        return objAttr;
      }, {})
  );
}

function elementToTree(element, hasColor) {
  return element
    .filter((_, e) => e.tagName && !['style'].includes(e.tagName))
    .map((_, e) => ({
      tag: e.tagName,
      attr: attrConverter(e.attribs, e.tagName, hasColor),
      child:
        e.children && e.children.length > 0
          ? elementToTree(cheerio.default(e.children), hasColor)
          : undefined,
    }))
    .get();
}

async function generate() {
  const iconSvgPaths = await glob(path.resolve(rootDir, 'src/icons/**/*.svg'));
  const rootComponentsDir = path.resolve(rootDir, 'src/components');
  await rmdir(rootComponentsDir, { recursive: true });
  await mkdir(rootComponentsDir);
  await writeComponent(
    'src/components/index.ts',
    `// THIS FILE IS AUTO GENERATED. DO NOT MODIFY!
`,
  );
  await writeComponent(
    'src/components/icons.stories.tsx',
    `import React  from 'react';
import { Story } from '@storybook/react';
import styled from '@emotion/styled';
`,
  );

  let contentImport = '';
  let contentElements = '';
  for (const svgPath of iconSvgPaths) {
    const svgContent = await promisify(fs.readFile)(svgPath, 'utf8');
    const relativeIconPath = svgPath.split('/src/icons/')[1];
    const iconType = relativeIconPath.split('/')[0];

    const $svg = cheerio.load(svgContent, { xmlMode: true })('svg');
    const hasColor = iconType === 'color';

    const tree = elementToTree($svg, hasColor);
    const iconData = tree[0];
    const rawName = path.basename(svgPath, path.extname(svgPath));
    const pascalIconTypeName = camelcase(iconType, { pascalCase: true });
    const pascalName = camelcase(rawName, { pascalCase: true }) + pascalIconTypeName;

    await writeComponent(
      `src/components/${pascalName}.tsx`,
      `// THIS FILE IS AUTO GENERATED. DO NOT MODIFY!
      import React from 'react';
      import { GenIcon, IconBaseProps } from '../support/IconBase';
      ${
        !hasColor
          ? `
        export interface ${pascalName}Props extends IconBaseProps {
          color?: string;
        }
      `
          : `
        export type ${pascalName}Props = IconBaseProps;
      `
      }
      export const ${pascalName}: React.FC<${pascalName}Props> = (props: ${pascalName}Props) =>
        GenIcon(${JSON.stringify(iconData)})(props);
      `,
    );
    await appendComponent('src/components/index.ts', `export * from './${pascalName}';`);
    contentImport += `import { ${pascalName} } from './${pascalName}';\n`;
    contentElements += `  <Box title={'${pascalName}'} { ...args }><${pascalName} /></Box>\n`;
  }
  await appendComponent(
    'src/components/icons.stories.tsx',
    `
      ${contentImport}
      export default { title: 'Design element/Icon' };
      interface BoxProps {
        children: any;
        color: string;
        size: number;
        title?: string;
      }
      const BoxStyled = styled.div<Partial<BoxProps>>\`
        display: inline-block;
        padding: 20px 4px;
        margin: 12px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: \${({color}) => color};
        width: 160px;
        font-size: \${({size}) => size}px;
        text-align: center;
        word-wrap: break-word;
        &:hover {
          border-color: #ccc;
        }
      \`;
      const Box = ({
        children,
        title = '',
        ...props
      }: BoxProps) => <BoxStyled { ...props }>{children}<span style=\{{ display: 'block', fontSize: 14 }}>{title}</span></BoxStyled>;
      const Template: Story<BoxProps> = args => <div>
      ${contentElements}
      </div>;
      export const All = Template.bind({});
      All.args = \{
        color: '#333333',
        size: 24,
      };
      `,
  );
  const prettierComponentsDir = 'prettier --config ../../.prettierrc.js --write ./src/components';

  await exec(prettierComponentsDir);
}

generate();
