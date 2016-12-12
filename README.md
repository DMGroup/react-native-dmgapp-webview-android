# react-native-dmgapp-webview-android
 React Native Android module to use Android's WebView inside your app.


### Installation

```bash
npm install react-native-dmgapp-webview-android --save
```

### Add it to your android project

* In `android/setting.gradle`

```gradle
...
include ':react-native-dmgapp-webview-android'
project(':react-native-dmgapp-webview-android').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-dmgapp-webview-android/android')

```

* In `android/app/build.gradle`

```gradle
...
dependencies {
  ...
  compile project(':react-native-dmgapp-webview-android')
}
```

* Register Module - RN >= 0.29 (in MainApplication.java)

```java
import com.dmgapp.rnwebview.RNDmgWebViewPackage; // <--- import

public class MainApplication extends Application implements ReactApplication {
  ......

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNDmgWebViewPackage()); // <------ add this line to your MainApplication class
  }

  ......

}
```

If you need to see the install instructions for older React Native versions [look here](https://github.com/DMGroup/react-native-dmgapp-webview-android/#readme).


## Example
```javascript
var React = require('react-native');
var { StyleSheet } = React;

var WebViewAndroid = require('react-native-dmgapp-webview-android');

var SITE_URL = "http://www.whdi.gov.cn/zw/";

var WebViewAndroidDmgApp = React.createClass({
    getInitialState: function() {
      return {
        url: SITE_URL,
        // OR
        // you can use a source object like React Native Webview.
        // source {uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}
        // Loads static html or a uri (with optional headers) in the WebView. <Just like React Native's version>
        // source: {
        //   uri: SITE_URL,
        //   headers: {
        //     ...
        //   },
        // },
        status: 'No Page Loaded',
        backButtonEnabled: false,
        forwardButtonEnabled: false,
        loading: true,
      };
    },
    goBack: function() {
      this.refs.WebViewAndroidDmgApp.goBack(); // you can use this callbacks to control webview
    },
    goForward: function() {
      this.refs.WebViewAndroidDmgApp.goForward();
    },
    reload: function() {
      this.refs.WebViewAndroidDmgApp.reload();
    },
    onNavigationStateChange: function(event) {
      console.log(event);

      this.setState({
        backButtonEnabled: event.canGoBack,
        forwardButtonEnabled: event.canGoForward,
        url: event.url,
        status: event.title,
        loading: event.loading
      });
    },
    render: function() {
      return (
        <WebViewAndroid
                ref="WebViewAndroidDmgApp"
                style={styles.containerWebView}
                javaScriptEnabled={true}
                geolocationEnabled={false}
                builtInZoomControls={true}
                supportZoom={true}
                loadWithOverviewMode={true}
                useWideViewPort={true}
                onNavigationStateChange={this.onNavigationStateChange.bind( this )}
                url={SITE_URL} // or use the source(object) attribute...
              />
      );

      // other attributes: source(object), html(string), htmlCharset(string), baseUrl(string), injectedJavaScript(string), disableCookies(bool), disablePlugins(bool), userAgent(string)
    }
});

var styles = StyleSheet.create({
  containerWebView: {
    flex: 1,
  }
});