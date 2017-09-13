// A mapping of `manifest.json` keys that map to one or more `package.json` keys
const manifestToPackage = {
  'author': 'author',
  'description': 'description',
  'homepage_url': 'homepage',
  'name': ['product_name', 'name'],
  'version': 'version'
};

class ExtensionManifestWebpackPlugin {
  /**
   * A webpack extension to create the `manifest.json` file for a WebExtension based off fields in the `package.json`
   * file.
   * 
   * Certain `package.json` keys, such as `author`, `name`, and `version`, are automatically converted to their
   * respective `manifest.json` equivalents.
   * 
   * Any fields inside the `"manifest.json"` config in the `package.json` file are also added to the resulting
   * `manifest.json` file, i.e.:
   * 
   *     // package.json
   *     {
   *       // ...
   *       "config": {
   *         "manfiest.json": {
   *           "permissions": [
   *             // ...
   *           ],
   *           "background": {
   *             // ...
   *           },
   *           // ...
   *         }
   *       }
   *       // ...
   *     }
   * 
   * There is also an option to generate `pretty` output, which defaults to false.
   */
  constructor(packageJson, opts) {
    this.packageJson = packageJson;
    this.opts = Object.assign({
      pretty: false
    }, opts);
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let manifest = {
        'manifest_version': 2
      };

      // Apply the mapping of `package.json` keys to `manifest.json` keys.
      for (let manifestKey of Object.keys(manifestToPackage)) {
        let packageKey = manifestToPackage[manifestKey];

        if (typeof packageKey === 'string') {
          packageKey = [packageKey];
        }

        for (let i = 0; i < packageKey.length; i++) {
          if (this.packageJson.hasOwnProperty(packageKey[i])) {
            manifest[manifestKey] = this.packageJson[packageKey[i]];
            break;
          }
        }
      }
  
      // Finally, override anything in the manifest object with anything defined in the config in `package.json`.
      manifest = Object.assign(manifest, this.packageJson.config['manifest.json']);
  
      // Cache the stringified JSON and output it as a compilation asset.
      const manifestSrc = JSON.stringify(manifest, null, this.opts.pretty ? '  ' : '');
      compilation.assets['manifest.json'] = {
        source: () => manifestSrc,
        size: () => manifestSrc.length
      };
  
      callback();
    });
  }
}

module.exports = ExtensionManifestWebpackPlugin;
