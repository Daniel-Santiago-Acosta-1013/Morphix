#!/usr/bin/env bash
set -euo pipefail

normalize_origin() {
  local value="${1%/}"
  if [[ -z "${value}" ]]; then
    return 0
  fi

  if [[ "${value}" == http://* || "${value}" == https://* ]]; then
    printf '%s' "${value}"
  else
    printf 'https://%s' "${value}"
  fi
}

base_origins="${ALLOWED_ORIGINS_BASE:-${ALLOWED_ORIGINS:-http://localhost:5173}}"
frontend_origin="$(normalize_origin "${FRONTEND_ORIGIN:-}")"

if [[ -z "${frontend_origin}" && -d "infra/terraform/envs/frontend" ]] && command -v terragrunt >/dev/null 2>&1; then
  if frontend_domain="$(cd infra/terraform/envs/frontend && terragrunt output -raw cloudfront_domain_name 2>/dev/null)"; then
    frontend_origin="$(normalize_origin "${frontend_domain}")"
  fi
fi

if [[ -z "${frontend_origin}" ]] && command -v aws >/dev/null 2>&1; then
  frontend_bucket_domain="${PROJECT_NAME:-morphix}-${ENVIRONMENT:-dev}-frontend.s3.${AWS_REGION:-us-east-1}.amazonaws.com"
  if frontend_domain="$(
    aws cloudfront list-distributions \
      --query "DistributionList.Items[?Origins.Items[?DomainName=='${frontend_bucket_domain}']].DomainName | [0]" \
      --output text 2>/dev/null
  )"; then
    if [[ -n "${frontend_domain}" && "${frontend_domain}" != "None" ]]; then
      frontend_origin="$(normalize_origin "${frontend_domain}")"
    fi
  fi
fi

allowed_origins="${base_origins%,}"
if [[ -n "${frontend_origin}" && ",${allowed_origins}," != *",${frontend_origin},"* ]]; then
  allowed_origins="${allowed_origins},${frontend_origin}"
fi

export ALLOWED_ORIGINS="${allowed_origins}"
if [[ -n "${frontend_origin}" ]]; then
  export FRONTEND_ORIGIN="${frontend_origin}"
fi

if [[ -n "${GITHUB_ENV:-}" ]]; then
  echo "ALLOWED_ORIGINS=${ALLOWED_ORIGINS}" >> "${GITHUB_ENV}"
  if [[ -n "${frontend_origin}" ]]; then
    echo "FRONTEND_ORIGIN=${frontend_origin}" >> "${GITHUB_ENV}"
  fi
fi

echo "Resolved browser origins: ${ALLOWED_ORIGINS}"
