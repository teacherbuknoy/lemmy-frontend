const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { fs: mfs } = require('memfs')
const isProd = process.env.ELEVENTY_ENV === 'production'
class ScriptSourceMap {
  constructor() {
    this.inputFiles = {
      index: 'index.js',
      community: 'community.js',
    }
  }

  data() {
    const outputPath = path.resolve(__dirname, "../../memory-fs/js/")
    const envPlugin = new webpack.EnvironmentPlugin({ ELEVENTY_ENV: process.env.ELEVENTY_ENV })
    const vars = new webpack.DefinePlugin({
      GENERATED: JSON.stringify(new Date().toISOString())
    })

    const rules = [
      {
        test: /\.m?js$'/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]

    const webpackEntry = {}
    Object.keys(this.inputFiles).forEach(key => webpackEntry[key] = `./src/assets/scripts/${this.inputFiles[key]}`)

    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'bundleName',
        size: 1
      },
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js.map`,
      webpackConfig: {
        mode: isProd ? 'production' : 'development',
        entry: webpackEntry,
        output: { path: outputPath },
        module: { rules },
        plugins: [envPlugin, vars],
        target: 'web',
        devtool: 'source-map'
      }
    }
  }

  compile(bundleName, webpackConfig) {
    const compiler = webpack(webpackConfig)
    compiler.outputFileSystem = mfs
    compiler.inputFileSystem = fs
    compiler.intermediateFileSystem = mfs

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          const errors = err || (stats.compilation ? stats.compilation.errors : null)
          reject(errors)
          return
        }

        const outputSourceMap = `${webpackConfig.output.path}/${bundleName}.js.map`
        const charset = 'utf-8'
        mfs.readFile(outputSourceMap, charset, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
    })

    // return `${transformedCode.code}\n//# sourceMappingURL=${bundleName}.js.map`
  }

  async render({ bundleName, webpackConfig }) {
    try {
      const result = await this.compile(bundleName, webpackConfig)
      return result
    } catch (err) {
      console.error(err)
      return "// Bundle has errors"
    }
  }
}

module.exports = ScriptSourceMap