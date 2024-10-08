// eslint-disable-next-line no-undef
const env = process.env;
const name = env.EXPO_APP_NAME;
const packageName = env.EXPO_PACKAGE_NAME;
console.log(name, packageName);

export default {
  expo: {
    name: name,
    slug: "hauthenticator",
    version: "0.14.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "hauthenticator",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      packageName,
      supportsTablet: true,
      jsEngine: "jsc",
      infoPlist: {
        NSCameraUsageDescription: "Allow $(PRODUCT_NAME) to access camera.",
        NSMicrophoneUsageDescription: "Allow $(PRODUCT_NAME) to access your microphone",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff",
        googleServicesFile: "./google-services.json",
      },
      GoogleServicesFile: "./google/google-services.json",
      permissions: ["android.permission.CAMERA"],
      package: packageName,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],
      [
        "expo-local-authentication",
        {
          faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
        },
      ],
      "@react-native-google-signin/google-signin",
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "efa31160-d975-4d8b-981b-479fb5a58cf6",
      },
    },
  },
};
