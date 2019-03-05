import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

class MyApp extends App {
  // the next lifecycle method will run before the render
  // and will crawl the page for any mutations, data we need to fetch
  // as a result, we get pageProps before render
  // how SSR work
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    // if the components we're trying to render has some props
    // then we're going to surface those with page props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
