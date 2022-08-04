import type {GatsbyConfig} from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Rybinsk events`,
        siteUrl: `https://www.yourdomain.tld`
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
        resolve: 'gatsby-plugin-manifest',
        options: {
            "icon": "src/images/icon.png"
        }
    }, "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
        resolve: 'gatsby-source-filesystem',
        options: {
            "name": "images",
            "path": "./src/images/"
        },
        __key: "images"
    }, {
        resolve: 'gatsby-source-filesystem',
        options: {
            "name": "pages",
            "path": "./src/pages/"
        },
        __key: "pages"
    },
        {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:700,400&amp;subset=cyrillic,latin,greek,vietnamese">*/
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Roboto`, 'Oxygen'
                ],
                display: 'swap'
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Рыбинск - день города 2022`,
                short_name: `Рыбинск`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#a2466c`,
                display: `standalone`,
                icon: `src/images/icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-offline',
            options: {
                workboxConfig: {
                    globPatterns: ['**/icon-path*']
                }
            }
        }
    ]
};

export default config;
