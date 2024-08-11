/* eslint-disable @typescript-eslint/no-unused-vars */

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { compression } from 'vite-plugin-compression2'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

function ensureTrailingSlash(url: string | undefined) {
  if (!url) return url
  if (!url.endsWith('/')) {
    url += '/'
  }
  return url
}

export default defineConfig(
  //! Somehow async config throws error on terser but builds fine
  // @ts-ignore
  async ({ command, mode, isSsrBuild, isPreview }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
      plugins: [
        process.env.APP_RELEASE
          ? compression({
              algorithm: 'gzip',
              compressionOptions: { level: 9 } //level 9 by default
            })
          : false,
        process.env.APP_RELEASE
          ? compression({
              algorithm: 'brotliCompress' // level 11 by default for brotli
            })
          : false,
        process.env.APP_RELEASE ? ViteImageOptimizer() : false,
        vue(),
        VueI18nPlugin({
          include: [path.resolve(__dirname, './src/i18n/locales/**')],

          allowDynamic: false,
          jitCompilation: false,
          dropMessageCompiler: false,
          runtimeOnly: false,
          compositionOnly: true,
          ssr: false,
          fullInstall: false,
          forceStringify: false,
          useVueI18nImportName: false,
          strictMessage: false,
          escapeHtml: false
        }),
        !process.env.APP_RELEASE ? VueDevTools() : false,
        createHtmlPlugin({
          minify:
            process.env.NODE_ENV == 'production'
              ? {
                  caseSensitive: true,
                  collapseBooleanAttributes: true,
                  collapseInlineTagWhitespace: true,
                  collapseWhitespace: true,
                  conservativeCollapse: true,
                  decodeEntities: true,
                  html5: true,
                  keepClosingSlash: true,
                  minifyCSS: true,
                  minifyJS: true,
                  minifyURLs: true,
                  noNewlinesBeforeTagClose: true,
                  removeAttributeQuotes: true,
                  removeComments: true,
                  removeEmptyAttributes: true,
                  removeOptionalTags: true,
                  removeRedundantAttributes: true,
                  sortAttributes: true,
                  sortClassName: true,
                  trimCustomFragments: true,
                  useShortDoctype: true
                }
              : false,

          pages: [
            {
              entry: 'src/main.ts',
              filename: 'index.html',
              template: './index.html',
              injectOptions: {
                data: {},
                ejsOptions: {
                  async: true
                }
              }
            }
          ]
        })
      ].filter(Boolean),
      server: {
        //dev mode only
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            secure: false,
            ws: true
          }
        }
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '%': fileURLToPath(new URL('./resources', import.meta.url)),
          '*': fileURLToPath(new URL('./public', import.meta.url))
        }
      },
      define: {
        APP_SERVER_URL: JSON.stringify(ensureTrailingSlash(env.APP_SERVER_URL) || '')
      },
      build: {
        emptyOutDir: true,
        minify: process.env.NODE_ENV == 'production' ? 'terser' : false,
        terserOptions: {
          compress: {
            arguments: true,
            arrows: true,
            booleans_as_integers: true, // unsafe for discord // unsafe for nest
            booleans: true,
            collapse_vars: true,
            comparisons: true,
            computed_props: true,
            conditionals: true,
            dead_code: true,
            defaults: true,
            directives: true,
            drop_console: true, //?
            drop_debugger: true, //?
            ecma: 2020,
            evaluate: true,
            expression: true,
            global_defs: {},
            hoist_funs: true,
            hoist_props: true,
            hoist_vars: true,
            ie8: false,
            if_return: true,
            inline: true,
            join_vars: true,
            keep_classnames: false, // unsafe for discord
            keep_fargs: false,
            keep_fnames: false,
            keep_infinity: false,
            loops: true,
            module: true,
            negate_iife: true,
            passes: 100,
            properties: true,
            pure_funcs: [],
            pure_getters: 'strict',
            reduce_vars: true,
            reduce_funcs: true,
            sequences: true,
            side_effects: true,
            switches: true,
            toplevel: true,
            top_retain: null,
            typeofs: true,

            unsafe_arrows: true, // unsafe for nest
            unsafe: true, // unsafe for discord

            unsafe_comps: true,
            unsafe_Function: true,
            unsafe_math: true,
            unsafe_symbols: true,

            unsafe_methods: true,
            unsafe_proto: true,
            unsafe_regexp: true,
            unsafe_undefined: true,

            unused: true
          },
          ecma: 2020,
          enclose: false,
          ie8: false,
          keep_classnames: false, //unsafe for discord
          keep_fnames: false,
          mangle: {
            eval: true,
            keep_classnames: false, //unsafe for discord
            keep_fnames: false,
            module: true,
            //nth_identifier
            properties: false, //unsafe for frontend
            // properties: {
            // builtins: false,
            // debug: false,
            // keep_quoted: false,
            // nth_identifier
            // regex: undefined,
            // reserved: [],
            // },
            safari10: false,
            toplevel: true
          },
          module: true,
          nameCache: undefined,
          format: {
            ascii_only: false,
            beautify: false,
            braces: false,
            comments: false,
            ecma: 2020,
            ie8: false,
            keep_numbers: false,
            indent_level: 0,
            indent_start: 0,
            inline_script: true,
            keep_quoted_props: false,
            max_line_len: false,
            preamble: undefined,
            preserve_annotations: false,
            quote_keys: false,
            quote_style: 0,
            safari10: false,
            semicolons: true,
            shebang: true,
            webkit: false,
            wrap_iife: false,
            wrap_func_args: true
          },
          parse: {
            bare_returns: true,
            html5_comments: false,
            shebang: true
          },
          safari10: false,
          sourceMap: false,
          toplevel: true
        },
        rollupOptions: {
          input: 'index.html',
          output: {
            dir: process.env.APP_RELEASE
              ? path.resolve(__dirname, 'release')
              : path.resolve(__dirname, 'dist'),
            entryFileNames: process.env.NODE_ENV === 'production' ? '[hash].js' : 'index-[name].js',
            assetFileNames: (assetInfo: any) => {
              let extType = assetInfo.name.split('.').at(1)
              if (process.env.NODE_ENV === 'production') {
                return '[hash][extname]'
              }
              if (/css/i.test(extType)) {
                return `[name]-[hash][extname]`
              }
              if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
                extType = 'img'
                return `assets/${extType}/[name]-[hash][extname]`
              }
              if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) {
                extType = 'media'
                return `assets/${extType}/[name]-[hash][extname]`
              }
              if (/woff2?|eot|ttf|otf/i.test(extType)) {
                extType = 'fonts'
                return `assets/${extType}/[name]-[hash][extname]`
              }
              return 'assets/[name]-[hash][extname]'
            },
            chunkFileNames: process.env.NODE_ENV === 'production' ? '[hash].js' : 'chunk-[name].js',
            manualChunks: undefined
          }
        }
      }
    }
  }
)
