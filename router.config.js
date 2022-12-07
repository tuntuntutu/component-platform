const fs = require('fs');
const path = require('path');


const getDocs = () => {
  const routePath = path.join('.', 'src', 'docs');
  const docTypeList = fs.readdirSync(routePath);

  return docTypeList.reduce((ret, typeDir) => {
    const currentPath = path.join(routePath, typeDir, 'config.json');

    if (fs.existsSync(currentPath)) {
      const routes = JSON.parse(fs.readFileSync(currentPath, 'utf8'));

      routes.forEach((item) => {
        const { title, content, ...others } = item;
        const filePath = path.join(routePath, typeDir, `${title}.md`);

        if (typeDir === 'mobile') {
          ret.push({
            name: `${title}@${typeDir}-demo`,
            content: content || filePath,
            usageMode: 'hide',
            description: {
              suffix: typeDir,
              isDemoPage: true,
              ...others,
            },
          });
        }

        ret.push({
          name: `${title}@${typeDir}`,
          content: content || filePath,
          usageMode: 'hide',
          description: {
            suffix: typeDir,
            ...others,
          },
        });
      });
    }

    return ret;
  }, []);
};
// const pcComponents = getDocs('pc');
// const utilsComponents = getDocs('utils');

module.exports = getDocs();
