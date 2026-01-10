#![warn(clippy::all, clippy::pedantic)]

/// Convert file paths in CLI arguments to deep link URLs.
#[cfg(any(windows, target_os = "linux"))]
fn convert_file_paths_to_deep_links(args: &[String]) -> Vec<String> {
   use std::path::PathBuf;
   use url::Url;

   if args.is_empty() {
      return Vec::new();
   }

   let mut result = vec![args[0].clone()];

   for maybe_file in args.iter().skip(1) {
      if maybe_file.starts_with('-') {
         result.push(maybe_file.clone());
         continue;
      }

      let path = PathBuf::from(maybe_file);
      if path.exists() {
         if let Ok(absolute_path) = path.canonicalize() {
            if let Ok(url) = Url::from_file_path(absolute_path) {
               result.push(url.to_string());
            } else {
               result.push(maybe_file.clone());
            }
         } else {
            result.push(maybe_file.clone());
         }
      } else {
         result.push(maybe_file.clone());
      }
   }

   result
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
/// Build and run the Tauri application.
///
/// # Panics
///
/// This function will panic if the Tauri application fails to build.
pub fn run() {
   let mut builder = tauri::Builder::default();

   #[cfg(any(windows, target_os = "linux"))]
   {
      builder = builder.plugin(tauri_plugin_single_instance::init(
         |app, argv, _cwd| {
            use tauri_plugin_deep_link::DeepLinkExt;

            app.deep_link().handle_cli_arguments(
               convert_file_paths_to_deep_links(&argv).into_iter(),
            );
         },
      ));
   }

   builder = builder
      .plugin(tauri_plugin_deep_link::init())
      .plugin(tauri_plugin_log::Builder::new().build())
      .plugin(tauri_plugin_os::init())
      .plugin(tauri_plugin_fs::init())
      .plugin(tauri_plugin_dialog::init())
      .plugin(tauri_plugin_opener::init());

   #[cfg(target_os = "android")]
   let builder = builder.plugin(tauri_plugin_android_fs::init());

   builder
      .invoke_handler(tauri::generate_handler![])
      .setup(|_app| {
         #[cfg(any(windows, target_os = "linux"))]
         {
            use tauri_plugin_deep_link::DeepLinkExt;

            _app.deep_link().register_all()?;

            let args: Vec<String> = std::env::args().collect();
            _app.deep_link().handle_cli_arguments(
               convert_file_paths_to_deep_links(&args).into_iter(),
            );
         }

         Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
