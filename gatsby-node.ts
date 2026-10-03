import type {GatsbyNode} from 'gatsby';
import {writeFileSync} from 'node:fs';

// Opt-in verification only: module provenance for the actual browser compilation.
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({stage, actions}) => {
    if (stage !== 'build-javascript' || process.env.BUNDLE_AUDIT !== '1') return;
    actions.setWebpackConfig({plugins: [{apply(compiler: any) {
        compiler.hooks.afterEmit.tap('BrowserModuleAudit', (compilation: any) => {
            const resources = new Set<string>();
            const visit = (modules: Iterable<any>) => {
                for (const module of modules) {
                    if (module.resource) resources.add(module.resource.replace(`${process.cwd()}/`, ''));
                    if (module.modules) visit(module.modules);
                }
            };
            visit(compilation.modules);
            writeFileSync('.cache/browser-modules.json', JSON.stringify([...resources].sort(), null, 2));
        });
    }}]});
};
