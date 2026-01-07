# Capabilities

If you are getting an invalid value for `android-fs` warning in `android.json` you may have to first build for android:

```sh
pnpm tauri android build
```

This should generate the schemas in `../gen/schemas/android-schema.json`.