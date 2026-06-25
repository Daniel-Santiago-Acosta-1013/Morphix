#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BUILD_DIR="${APP_DIR}/.lambda_build"
DIST_DIR="${APP_DIR}/lambda_dist"
PACKAGE_PATH="${DIST_DIR}/morphix-api.zip"
LAYER_PACKAGE_PATH="${DIST_DIR}/morphix-api-dependencies.zip"
PYTHON_BIN="${PYTHON_BIN:-python3.11}"
LAMBDA_PLATFORM="${LAMBDA_PLATFORM:-x86_64-manylinux2014}"

if ! command -v uv >/dev/null 2>&1; then
  echo "uv is required to build the Lambda package." >&2
  exit 1
fi

if ! command -v zip >/dev/null 2>&1; then
  echo "zip is required to build the Lambda package." >&2
  exit 1
fi

rm -rf "${BUILD_DIR}" "${DIST_DIR}"
mkdir -p "${BUILD_DIR}/function" "${BUILD_DIR}/layer/python" "${DIST_DIR}"

"${PYTHON_BIN}" - "${APP_DIR}/pyproject.toml" <<'PY' > "${BUILD_DIR}/requirements.txt"
from pathlib import Path
import sys
import tomllib

pyproject = tomllib.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
for dependency in pyproject["project"]["dependencies"]:
    print(dependency)
PY

(
  cd "${APP_DIR}"
  uv pip install \
    --python "${PYTHON_BIN}" \
    --python-platform "${LAMBDA_PLATFORM}" \
    --target "${BUILD_DIR}/layer/python" \
    -r "${BUILD_DIR}/requirements.txt"
)

find "${BUILD_DIR}" \
  -type d -name "__pycache__" \
  -prune -exec rm -rf {} +
find "${BUILD_DIR}" -type f -name "*.pyc" -delete
find "${BUILD_DIR}/layer/python" -type f -name ".lock" -delete

cp -R "${APP_DIR}/src/morphix_api" "${BUILD_DIR}/function/morphix_api"

find "${BUILD_DIR}/function" \
  -type d -name "__pycache__" \
  -prune -exec rm -rf {} +
find "${BUILD_DIR}/function" -type f -name "*.pyc" -delete

(
  cd "${BUILD_DIR}/function"
  zip -qr "${PACKAGE_PATH}" .
)

(
  cd "${BUILD_DIR}/layer"
  zip -qr "${LAYER_PACKAGE_PATH}" .
)

rm -rf "${BUILD_DIR}"

echo "${PACKAGE_PATH}"
echo "${LAYER_PACKAGE_PATH}"
