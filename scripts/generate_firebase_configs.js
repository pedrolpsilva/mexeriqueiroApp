const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.substring(0, eqIdx).trim();
          const val = trimmed.substring(eqIdx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

loadEnv();

const projectNumber = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_NUMBER || '1012535452207';
const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'mexeriqueiro-d1ac1';
const storageBucket = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mexeriqueiro-d1ac1.firebasestorage.app';

// Android Config
const androidAppId = process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:1012535452207:android:1fc9d0113fe490149bdcda';
const androidPackageName = process.env.EXPO_PUBLIC_FIREBASE_ANDROID_PACKAGE_NAME || 'com.mexeriqueiro';
const androidApiKey = process.env.EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyD0AMKVVeTL1LRIVHx8fiqJuuEhciwmWnM';
const googleAndroidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '1012535452207-ac57u20jhntii07itfdp8ohemnmqirgj.apps.googleusercontent.com';

const googleServicesJson = {
  "project_info": {
    "project_number": projectNumber,
    "project_id": projectId,
    "storage_bucket": storageBucket
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": androidAppId,
        "android_client_info": {
          "package_name": androidPackageName
        }
      },
      "oauth_client": [
        {
          "client_id": googleAndroidClientId,
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": androidApiKey
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": googleAndroidClientId,
              "client_type": 3
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
};

// iOS Config
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '1012535452207-sm6hffdcghclj9b8vifga47fo4cankof.apps.googleusercontent.com';
const iosReversedClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_REVERSED_CLIENT_ID || 'com.googleusercontent.apps.1012535452207-sm6hffdcghclj9b8vifga47fo4cankof';
const iosApiKey = process.env.EXPO_PUBLIC_FIREBASE_IOS_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDOAHS5Okg_c_CwUlnTFFmiedbLPFAxAq4';
const iosBundleId = process.env.EXPO_PUBLIC_FIREBASE_IOS_BUNDLE_ID || 'com.mexeriqueiro';
const iosAppId = process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID || '1:1012535452207:ios:7ff80625bde4b5539bdcda';

const googleServiceInfoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CLIENT_ID</key>
	<string>${iosClientId}</string>
	<key>REVERSED_CLIENT_ID</key>
	<string>${iosReversedClientId}</string>
	<key>API_KEY</key>
	<string>${iosApiKey}</string>
	<key>GCM_SENDER_ID</key>
	<string>${projectNumber}</string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string>${iosBundleId}</string>
	<key>PROJECT_ID</key>
	<string>${projectId}</string>
	<key>STORAGE_BUCKET</key>
	<string>${storageBucket}</string>
	<key>IS_ADS_ENABLED</key>
	<false></false>
	<key>IS_ANALYTICS_ENABLED</key>
	<false></false>
	<key>IS_APPINVITE_ENABLED</key>
	<true></true>
	<key>IS_GCM_ENABLED</key>
	<true></true>
	<key>IS_SIGNIN_ENABLED</key>
	<true></true>
	<key>GOOGLE_APP_ID</key>
	<string>${iosAppId}</string>
</dict>
</plist>`;

const rootDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(rootDir, 'google-services.json'), JSON.stringify(googleServicesJson, null, 2), 'utf8');
fs.writeFileSync(path.join(rootDir, 'GoogleService-Info.plist'), googleServiceInfoPlist, 'utf8');

const androidAppDir = path.join(rootDir, 'android', 'app');
if (fs.existsSync(androidAppDir)) {
  fs.writeFileSync(path.join(androidAppDir, 'google-services.json'), JSON.stringify(googleServicesJson, null, 2), 'utf8');
}

console.log('Successfully generated google-services.json and GoogleService-Info.plist from .env!');
