package com.cloq2ndchallenge;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Promise;
import android.os.Build;
import android.os.BatteryManager;
import android.content.Intent;
import android.content.IntentFilter;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    DeviceInfoModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    public WritableMap getSystemDetailSync() {
        WritableMap systemInfo = Arguments.createMap();
        systemInfo.putString("Brand", Build.BRAND);
        systemInfo.putString("Model", Build.MODEL);
        systemInfo.putString("ID", Build.ID);
        systemInfo.putString("Manufacture", Build.MANUFACTURER);
        systemInfo.putString("Brand", Build.BRAND);
        systemInfo.putString("Brand", Build.BRAND);

        return systemInfo;
    }
    @ReactMethod
    public void getSystemDetail(Promise p) { p.resolve(getSystemDetailSync()); }


    public float getBatterySync() {
        //WritableMap battery = Arguments.createMap();
        Intent batteryIntent = getReactApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);


        float batteryPct = level * 100 / (float) scale;

        return batteryPct;
        //battery.putString("Battery", batteryPct);
    }

    @ReactMethod
    public void getBattery(Promise p) { p.resolve(getBatterySync()); }

}
