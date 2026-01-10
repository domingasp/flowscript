use std::path::{Path, PathBuf};

use url::Url;

/// Convert file paths in CLI arguments to deep link URLs.
///
/// Returns a new vector of all arguments, with markdown
/// file paths converted to deep links.
pub fn convert_file_paths_to_deep_links(args: &[String]) -> Vec<String> {
   if args.is_empty() {
      return Vec::new();
   }

   let mut result = vec![args[0].clone()];
   result.extend(args.iter().skip(1).map(|arg| convert_arg(arg)));
   result
}

/// Convert markdown file paths in CLI arguments to deep link URLs.
fn convert_arg(arg: &str) -> String {
   // Skip flags
   if arg.starts_with('-') {
      return arg.to_string();
   }

   let path = PathBuf::from(arg);
   if !path.is_file() {
      return arg.to_string();
   }

   if !is_markdown(&path) {
      return arg.to_string();
   }

   convert_to_url(&path).unwrap_or_else(|| arg.to_string())
}

/// Return true if the path is to a file with a Markdown MIME type.
fn is_markdown(path: &Path) -> bool {
   let mime = mime_guess::from_path(path).first_or_octet_stream();
   mime.type_() == mime_guess::mime::TEXT
      && matches!(mime.subtype().as_str(), "markdown" | "x-markdown")
}

/// Convert a file path to a file URL string.
fn convert_to_url(path: &Path) -> Option<String> {
   let absolute_path = path
      .canonicalize()
      .inspect_err(|_| {
         log::error!("Failed to canonicalize path: {}", path.display());
      })
      .ok()?;

   Url::from_file_path(absolute_path)
      .inspect_err(|()| {
         log::error!("Failed to convert path to URL: {}", path.display());
      })
      .ok()
      .map(|url| url.to_string())
}
