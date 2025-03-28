#!/bin/bash

DEBUG=${DEBUG:-false}

GH_REPO="Barbapapazes-Sponsors/vue-ui"
# Use an environment variable to retrieve the GitHub token
GH_TOKEN=$GITHUB_TOKEN
RELATIONS_URL="https://vue-ui.barbapapazes.dev/relations.json"

fetch_directory_contents() {
  local repo_path=$1
  curl -sL \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GH_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/$GH_REPO/contents/$repo_path"
}

rewrite_path() {
  local local_path=$1
  local name=$2
  # If it's a component, we need to remove the subfolder references (components/ComponentName/ComponentName.vue -> components/ComponentName.vue)
  if [[ "$local_path" == *"/components/"* ]]; then
    echo "${local_path%/*}/$name"
  else
    echo "$local_path/$name"
  fi
}

rewrite_imports() {
  local final_path=$1
  local mode=$2
  sed -i '' -e 's|@/ui/components\/\([^/]*\)\/\1.vue|@/ui/components/\1.vue|g' "$final_path"
  if [[ "$mode" == "inertia" ]]; then
    sed -i '' -e 's|@/ui/components|@/UI/Components|g' "$final_path"
    sed -i '' -e 's|@/ui/composables|@/UI/Composables|g' "$final_path"
    sed -i '' -e 's|@/ui/theme|@/UI/Theme|g' "$final_path"
    sed -i '' -e 's|@/ui/utils|@/UI/Utils|g' "$final_path"
    sed -i '' -e 's|@/ui/types|@/UI/Types|g' "$final_path"
    sed -i '' -e 's|@/ui/keys|@/UI/Keys|g' "$final_path"
    sed -i '' -e 's|@/ui/icons|@/UI/Icons|g' "$final_path"
  fi
}

# Function to download files recursively
download_files() {
  local repo_path=$1
  local local_path=$2
  local mode=$3

  response=$(fetch_directory_contents "$repo_path")

  [ "$DEBUG" = true ] && echo "DEBUG: Processing $(echo "$response" | jq -r '. | length') items"

  echo ${response}

  # Loop through each item in the directory
  for item in $(echo "$response" | jq -r '.[] | @base64'); do
    _jq() {
      echo ${item} | base64 --decode | jq -r ${1}
    }

    name=$(_jq '.name')
    path=$(_jq '.path')
    type=$(_jq '.type')
    download_url=$(_jq '.download_url')

    if [ "$type" == "dir" ]; then
      if [[ "$name" == "__snapshots__" ]]; then
        continue
      fi

      if [[ "$local_path" != *"/components"* ]]; then
        mkdir -p "$local_path/$name"
      fi

      [ "$DEBUG" = true ] && echo "DEBUG: Processing directory $name"

      # Recursively download the contents of the directory
      download_files "$path" "$local_path/$name" "$mode"
    else
      if [[ "$name" == *.md ]]; then
        continue
      fi

      if [[ "$name" == "demo.vue" ]]; then
        continue
      fi

      [ "$DEBUG" = true ] && echo "DEBUG: Processing file $name"

      # Determine the final path by calling the new rewrite_path function
      final_path=$(rewrite_path "$local_path" "$name")

      echo "Relations: ${relations[@]}" "$name"

      # for each relation, we check if the name of the file starts with the relation (only if the relations is not empty)
      if [ ${#relations[@]} -gt 0 ]; then
        for relation in "${relations[@]}"; do
          if [[ "$name" == "$relation"* ]]; then
            [ "$DEBUG" = true ] && echo "DEBUG: Downloading file $name to $final_path"
            download_file "$download_url" "$final_path"
            rewrite_imports "$final_path" "$mode"
          fi

        done
      else
        [ "$DEBUG" = true ] && echo "DEBUG: Downloading file $name to $final_path"
        download_file "$download_url" "$final_path"
        rewrite_imports "$final_path" "$mode"
      fi
    fi
  done
}

download_file() {
  local input=$1
  local output=$2

  curl -sL -H "Authorization: Bearer $GH_TOKEN" "$input" -o "$output"
}

fetch_relations() {
  curl -sL "$RELATIONS_URL"
}

declare -a relations

# Recursive function that will search for all relations of an item
search_relations() {
  local type=$1
  local item=$2
  local all_relations=$3

  # Get the relations of the item
  local item_relations
  item_relations=$(echo "$all_relations" | jq -r ".$type[\"$item\"]")

  if [ "$item_relations" == "null" ]; then
    return
  fi

  # Get the keys of the relations
  local keys
  keys=$(echo "$item_relations" | jq -r 'keys[]')

  # Keys is empty, return
  # if [ -z "$keys" ]; then
  #   return
  # fi

  for key in $keys; do

    # Get the values of the relations from the current key
    local values
    values=$(echo "$item_relations" | jq -r ".$key")

    if [ "$values" == "null" ]; then
      continue
    fi

    for value in $(echo "$values" | jq -r '.[]'); do
      if [[ " ${relations[@]} " =~ " ${value} " ]]; then
        continue
      fi

      relations+=("$value")

      search_relations "$key" "$value" "$all_relations"
    done
  done
}

install_component() {
  local component=$1
  local local_path=$2
  local mode=$3
  local repo_path="src"

  all_relations=$(fetch_relations)

  # use the search_relations function to get all the relations of the component
  relations=("$component")
  search_relations "components" "$component" "$all_relations"

  download_files "$repo_path" "$local_path" "$mode"
}

install_components() {
  local local_path=$1
  local mode=$2
  local repo_path="src"

  download_files "$repo_path" "$local_path" "$mode"
}

parse_options() {
  while getopts "s:d:m:c:" opt; do
    case "$opt" in
    s) REPO_PATH="$OPTARG" ;;
    d) LOCAL_PATH="$OPTARG" ;;
    m) MODE="$OPTARG" ;;
    c) COMPONENT="$OPTARG" ;;
    *) usage ;;
    esac
  done
}

validate_options() {
  if [ -z "$REPO_PATH" ] || [ -z "$LOCAL_PATH" ]; then
    usage
  fi
  # Set default mode if not provided
  if [ -z "$MODE" ]; then
    MODE="vite"
  fi
  # Validate mode value
  if [ "$MODE" != "vite" ] && [ "$MODE" != "inertia" ]; then
    echo "Error: mode must be either 'vite' or 'inertia'."
    usage
  fi
}

usage() {
  echo "Usage: $0 -s <repo_path> -d <local_path> [-m <mode>] [-c <component>]"
  echo "       mode: vite (default) or inertia"
  echo "       component: name of the component to install (optional)"
  exit 1
}

main() {
  parse_options "$@"
  validate_options

  if [ -n "$COMPONENT" ]; then
    install_component "$COMPONENT" "$LOCAL_PATH" "$MODE"
  else
    install_components "$LOCAL_PATH" "$MODE"
  fi
}

main "$@"
