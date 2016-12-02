package com.dmgapp.rnwebview;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.*;


public class RNDmgWebViewPackage implements ReactPackage {

    private RNDmgWebViewModule module;
    private RNDmgWebViewManager viewManager;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        module = new RNDmgWebViewModule(reactContext);
        module.setPackage(this);

        List<NativeModule> modules = new ArrayList<>();
        modules.add(module);

        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        viewManager = new RNDmgWebViewManager();
        viewManager.setPackage(this);

        return Arrays.<ViewManager>asList(viewManager);
    }

    public RNDmgWebViewModule getModule() {
        return module;
    }

    public RNDmgWebViewManager getViewManager() {
        return viewManager;
    }

}
