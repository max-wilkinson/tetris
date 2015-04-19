package com.max.tetrisx;

import android.app.Activity;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends Activity {

    public class GeoWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            // When user clicks a hyperlink, load in the existing WebView
            view.loadUrl(url);
            return true;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            //hide loading image
            //findViewById(R.id.imageLoading1).setVisibility(View.GONE);
            //show webview
            findViewById(R.id.webView1).setVisibility(View.VISIBLE);
        }
    }

    /**
     * WebChromeClient subclass handles UI-related calls
     * Note: think chrome as in decoration, not the Chrome browser
     */
    public class GeoWebChromeClient extends WebChromeClient {
        @Override
        public void onGeolocationPermissionsShowPrompt(String origin,
                                                       GeolocationPermissions.Callback callback) {
            // Always grant permission since the app itself requires location
            // permission and the user has therefore already granted it
            callback.invoke(origin, true, false);
        }
    }

    WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webView1);
        mWebView.setWebViewClient(new GeoWebViewClient());
        // Below required for geolocation
        mWebView.getSettings().setJavaScriptEnabled(true);
        WebView.setWebContentsDebuggingEnabled(true);
        mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        mWebView.getSettings().setGeolocationEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);

        mWebView.setWebChromeClient(new GeoWebChromeClient());
        mWebView.loadUrl("file:///android_asset/www/home.html");
    }



}
