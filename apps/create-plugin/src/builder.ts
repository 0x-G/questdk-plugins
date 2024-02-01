const fs = require('fs-extra')
const path = require('path')
import Handlebars from 'handlebars'
import { cyan, red } from 'picocolors'

type BuilderParams = {
  projectName: string
  chain: string
  tx: string
  action: string
}

const arrow = '=>'
const logo = '✛' // not the logo but pretty close

export async function createPlugin(params: BuilderParams) {
  await copyDirectory(params)
  await replaceProjectName(params)
  await replaceFileNames(params)
  logBoostStars()
  console.log('Created a plugin for', cyan(`"${params.projectName}"`))
}

export function logBoostStars() {
  console.log()
  console.log(`--------------------------- ${logo} ${logo} ${logo} `)
  console.log(`--------------------------- ${logo} ${logo} ${logo} `)
  console.log(`--------------------------- ${logo} ${logo} ${logo}  `)
  console.log()
}

/**
 * This function creates the directory structure and copies over the template
 *
 * @param params
 * @returns
 */
async function copyDirectory(params: BuilderParams) {
  if (params.projectName.length < 1) {
    console.log(` ${red('exiting')} `)
    return
  }
  // get the target directory location
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)
  // if there is already a directory with the name throw an error
  if (await fs.pathExists(dest)) {
    console.error(
      `Could not create a plugin called ${red(
        `"${params.projectName}"`,
      )} because it already exists!`,
    )
    return
  }
  // create the directory
  try {
    await fs.ensureDir(dest)
  } catch (_e) {
    console.error(
      `Could not create a plugin called ${red(
        `"${params.projectName}"`,
      )} because of ${_e}`,
    )
    return
  }

  // copy the template files to the new directory
  const _source = path.join(__dirname, '../template')
  try {
    await fs.copy(_source, dest)
    console.log(
      `\t ${arrow} Created directory for ${cyan(`"${params.projectName}"`)}!`,
    )
  } catch (_e) {
    console.error(
      `Could not create a plugin called ${red(
        `"${params.projectName}"`,
      )} because of ${_e}`,
    )
    return
  }
}

/**
 * This function replaces multiple instances of the project name
 *
 * package.json
 * readme
 * changelog
 * src/project.ts
 * src/project.test.ts
 * index.ts
 *
 * @param params
 * @returns
 */
async function replaceProjectName(params: BuilderParams) {
  // get the target directory location
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)

  // replace the project name in the package.json
  const packageJsonPath = path.join(dest, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  packageJson.name = params.projectName
  packageJson.description = `Plugin for ${params.projectName}`
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
  console.log(`\t ${arrow} Updated file ${cyan('package.json')}!`)

  //replace the project name in the readme
  const readmePath = path.join(dest, 'README.md')
  const readme = await fs.readFile(readmePath, 'utf8')
  const readmeTemplate = Handlebars.compile(readme)
  await fs.writeFile(readmePath, readmeTemplate(params))
  console.log(`\t ${arrow} Updated file ${cyan('README.md')}!`)

  //replace the project name in the changelog
  const changelogPath = path.join(dest, 'CHANGELOG.md')
  const changelog = await fs.readFile(changelogPath, 'utf8')
  const changelogTemplate = Handlebars.compile(changelog)
  await fs.writeFile(changelogPath, changelogTemplate(params))
  console.log(`\t ${arrow} Updated file ${cyan('CHANGELOG.md')}!`)

  //replace the project name in index.ts.t
  const indexPath = path.join(dest, 'src/index.ts.t')
  const index = await fs.readFile(indexPath, 'utf8')
  const indexTemplate = Handlebars.compile(index)
  await fs.writeFile(indexPath, indexTemplate(params))
  console.log(`\t ${arrow} Updated file ${cyan('index.ts')}!`)
}

/**
 * This function replaces multiple instances of the project name
 *
 * package.json
 * readme
 * changelog
 * src/project.ts
 * src/project.test.ts
 * index.ts
 *
 * @param params
 * @returns
 */
async function replaceFileNames(params: BuilderParams) {
  // get the target directory location
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)

  //rename index.ts
  const indexPath = path.join(dest, 'src/index.ts.t')
  await fs.rename(indexPath, path.join(dest, 'src/index.ts'))
  console.log(`\t ${arrow} Created file ${cyan('index.ts')}!`)

  //rename project.ts
  const projectPath = path.join(dest, 'src/Project.ts.t')
  await fs.rename(projectPath, path.join(dest, `src/${params.projectName}.ts`))
  console.log(`\t ${arrow} Created file ${cyan(`${params.projectName}.ts`)}!`)

  //rename project.test.ts
  const testPath = path.join(dest, 'src/Project.test.ts.t')
  await fs.rename(
    testPath,
    path.join(dest, `src/${params.projectName}.test.ts`),
  )
  console.log(
    `\t ${arrow} Created file ${cyan(`${params.projectName}.test.ts`)}!`,
  )
}
