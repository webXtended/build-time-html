import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

export interface PageProps {
    title?: string
    body: string | JSX.Element,
    compProps?: any,
    cssLinks?: string[],
    inlineCss?: string,
    inlineScripts?: string,
    scripts?: string[]
}

function generateCSSLinkTags(paths: string[]) {
    return paths.map((path) => {
        return (
            <link type='text/css' rel='stylesheet' href={path}/>
        )
    });
}

function generateScriptTags(paths: string[]) {
    return paths.map((path) => {
        return (
            <script type='text/javascript' src={path}/>
        )
    });
}

function getBody(bodyProp: string | JSX.Element, compProps: any): JSX.Element {
    if (typeof bodyProp === 'string') {
        return <>{bodyProp}</>;
    }
    const Comp = (Elem: any) => <Elem {...compProps} />
    return Comp(bodyProp);
}

function getInlineCSS(css: string) {
    return (
        <style dangerouslySetInnerHTML={
            {
                __html: css
            }
        }/>
    )
}

function Page(props: PageProps) {

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <title>{props.title || 'app'}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {props.inlineCss ? getInlineCSS(props.inlineCss) : null}
            {props.cssLinks ? generateCSSLinkTags(props.cssLinks) : null}
        </head>
        <body>{getBody(props.body, props.compProps || {})}</body>
        {props.scripts ? generateScriptTags(props.scripts) : null}
        </html>
    );
}

export function getHTML(props: any) {
    return ReactDOMServer.renderToStaticMarkup(
        <Page {...props} />
    );
}
