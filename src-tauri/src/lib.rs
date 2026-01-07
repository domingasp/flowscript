#![warn(clippy::all, clippy::pedantic)]

#[cfg_attr(mobile, tauri::mobile_entry_point)]
/// Build and run the Tauri application.
///
/// # Panics
///
/// This function will panic if the Tauri application fails to build.
pub fn run() {
   tauri::Builder::default()
      .plugin(tauri_plugin_dialog::init())
      .plugin(tauri_plugin_opener::init())
      .invoke_handler(tauri::generate_handler![])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
