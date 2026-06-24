include "root" {
  path = find_in_parent_folders("root.hcl")
}

terraform {
  source = "../../../../blueprints/modules/storage"
}

locals {
  root                    = read_terragrunt_config(find_in_parent_folders("root.hcl"))
  frontend_origin         = get_env("FRONTEND_ORIGIN", "")
  default_allowed_origins = local.frontend_origin != "" ? "http://localhost:5173,${local.frontend_origin}" : "http://localhost:5173"
  browser_allowed_origins = get_env("ALLOWED_ORIGINS", local.default_allowed_origins)
}

inputs = {
  project_name          = local.root.locals.project_name
  environment           = local.root.locals.environment
  input_retention_days  = 1
  output_retention_days = 7
  max_upload_size_mb    = 100
  allowed_origins       = [for origin in split(",", local.browser_allowed_origins) : trimspace(origin) if trimspace(origin) != ""]
  force_destroy         = get_env("STORAGE_FORCE_DESTROY", "false") == "true"
  tags                  = local.root.locals.tags
}
