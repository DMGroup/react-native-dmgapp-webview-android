/**
 * @providesModule WebViewAndroid
 */
'use strict';

try {
  var React = require('react');
} catch(ex) {
  var React = require('react-native');
}

var RN = require("react-native");

var { requireNativeComponent, NativeModules } = require('react-native');
var RCTUIManager = NativeModules.UIManager;

var WEBVIEW_REF = 'androidWebView';

var WebViewAndroid = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    source: React.PropTypes.object,
    baseUrl: React.PropTypes.string,
    html: React.PropTypes.string,
    htmlCharset: React.PropTypes.string,
    userAgent: React.PropTypes.string,
    injectedJavaScript: React.PropTypes.string,
    disablePlugins: React.PropTypes.bool,
    disableCookies: React.PropTypes.bool,
    javaScriptEnabled: React.PropTypes.bool,
    geolocationEnabled: React.PropTypes.bool,
    allowUrlRedirect: React.PropTypes.bool,
    builtInZoomControls: React.PropTypes.bool,
    supportZoom: React.PropTypes.bool,
    loadWithOverviewMode: React.PropTypes.bool,
    setDisplayZoomControls: React.PropTypes.bool,
    setUseWideViewPort: React.PropTypes.bool,
    onNavigationStateChange: React.PropTypes.func
  },
  _onNavigationStateChange: function(event) {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  },
  goBack: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNDmgWebViewAndroid.Commands.goBack,
      null
    );
  },
  goForward: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNDmgWebViewAndroid.Commands.goForward,
      null
    );
  },
  reload: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNDmgWebViewAndroid.Commands.reload,
      null
    );
  },
  render: function() {
    return <RNDmgWebViewAndroid ref={WEBVIEW_REF} {...this.props} onNavigationStateChange={this._onNavigationStateChange} />;
  },
  _getWebViewHandle: function() {
    return RN.findNodeHandle(this.refs[WEBVIEW_REF]);
  },
});

var RNDmgWebViewAndroid = requireNativeComponent('RNDmgWebViewAndroid', null);

module.exports = WebViewAndroid;
