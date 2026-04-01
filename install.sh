#!/usr/bin/env bash
set -euo pipefail

# Absolute path to the directory containing this script (the plugin folder).
PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ---------------------------------------------------------------------------
# resolve_repo_root [explicit-path]
# ---------------------------------------------------------------------------
resolve_repo_root() {
  local candidate

  # 1. Explicit argument
  if [ -n "${1:-}" ]; then
    if [ -d "$1" ]; then
      echo "$(cd "$1" && pwd)"; return
    else
      echo "ERROR: '$1' is not a directory." >&2
      exit 1
    fi
  fi

  # 2. Parent of the plugin folder (plugin shipped inside the repo)
  candidate="$(cd "$PLUGIN_DIR/.." && pwd)"
  if [ -d "$candidate" ]; then
    echo "$candidate"; return
  fi

  # 3. Current working directory
  echo "$(pwd)"
}

# ---------------------------------------------------------------------------
# copy_files <src_dir> <dest_dir> <label> [ext]
# ---------------------------------------------------------------------------
copy_files() {
  local src_dir="$1"
  local dest_dir="$2"
  local label="$3"
  local ext="${4:-.md}"

  if [ ! -d "$dest_dir" ]; then
    mkdir -p "$dest_dir"
    echo "  [+] Created $dest_dir"
  fi

  local count=0
  for src_file in "$src_dir"/*"$ext"; do
    [ -f "$src_file" ] || continue
    local file_name
    file_name="$(basename "$src_file")"
    cp "$src_file" "$dest_dir/$file_name"
    echo "  [+] Copied $label: $file_name"
    count=$((count + 1))
  done

  if [ $count -eq 0 ]; then
    echo "  [=] No $label files found in $src_dir"
  fi
}

# ---------------------------------------------------------------------------
# copy_skills <src_dir> <dest_dir>
#   Skills can be .md files or directories with SKILL.md inside
# ---------------------------------------------------------------------------
copy_skills() {
  local src_dir="$1"
  local dest_dir="$2"

  if [ ! -d "$dest_dir" ]; then
    mkdir -p "$dest_dir"
    echo "  [+] Created $dest_dir"
  fi

  for item in "$src_dir"/*; do
    [ -e "$item" ] || continue
    local name
    name="$(basename "$item")"

    if [ -d "$item" ]; then
      # Skill directory with SKILL.md
      cp -r "$item" "$dest_dir/$name"
      echo "  [+] Copied skill dir: $name/"
    elif [ -f "$item" ] && [[ "$name" == *.md ]]; then
      # Flat .md skill
      local skill_name="${name%.md}"
      mkdir -p "$dest_dir/$skill_name"
      cp "$item" "$dest_dir/$skill_name/SKILL.md"
      echo "  [+] Copied skill: $name → $skill_name/SKILL.md"
    fi
  done
}

# ---------------------------------------------------------------------------
# add_gitignore_entry <gitignore_path> <entry>
# ---------------------------------------------------------------------------
add_gitignore_entry() {
  local gitignore="$1"
  local entry="$2"

  if [ -f "$gitignore" ]; then
    if grep -qF "$entry" "$gitignore"; then
      echo "  [=] .gitignore already contains: $entry"
      return
    fi
    printf '\n# Claude Code workspace (ephemeral, do not commit)\n%s\n' "$entry" >> "$gitignore"
  else
    printf '# Claude Code workspace (ephemeral, do not commit)\n%s\n' "$entry" > "$gitignore"
  fi
  echo "  [+] Added to .gitignore: $entry"
}

# ---------------------------------------------------------------------------
# check_mcp <name> <required>
# ---------------------------------------------------------------------------
check_mcp() {
  local name="$1"
  local required="$2"
  local marker="[?]"
  [ "$required" = "required" ] && marker="[!]"
  echo "  $marker MCP: $name ($required)"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
REPO_ROOT="$(resolve_repo_root "${1:-}")"

REPO_CLAUDE_DIR="$REPO_ROOT/.claude"
COMMANDS_DIR="$REPO_CLAUDE_DIR/commands"
AGENTS_DIR="$REPO_CLAUDE_DIR/agents"
SKILLS_DIR="$REPO_CLAUDE_DIR/skills"
SCHEMAS_DIR="$REPO_CLAUDE_DIR/schemas"
PRE_DEV_WORKSPACE="$REPO_CLAUDE_DIR/pre-dev-workspace"
DEV_WORKSPACE="$REPO_CLAUDE_DIR/dev-workspace"
GITIGNORE="$REPO_ROOT/.gitignore"

echo ""
echo "cap-garuda-plugin installer"
echo "===================================="
echo "  Plugin : $PLUGIN_DIR"
echo "  Repo   : $REPO_ROOT"
echo "  Target : $REPO_CLAUDE_DIR"
echo ""

# 1. Copy commands
echo "--- Commands ---"
copy_files "$PLUGIN_DIR/commands" "$COMMANDS_DIR" "command"
echo ""

# 2. Copy agents
echo "--- Agents ---"
copy_files "$PLUGIN_DIR/agents" "$AGENTS_DIR" "agent"
echo ""

# 3. Copy skills (as directories with SKILL.md)
echo "--- Skills ---"
copy_skills "$PLUGIN_DIR/skills" "$SKILLS_DIR"
echo ""

# 4. Copy schemas
echo "--- Schemas ---"
copy_files "$PLUGIN_DIR/schemas" "$SCHEMAS_DIR" "schema" ".json"
echo ""

# 5. Create workspace directories
echo "--- Workspaces ---"
for ws in "$PRE_DEV_WORKSPACE" "$DEV_WORKSPACE"; do
  if [ ! -d "$ws" ]; then
    mkdir -p "$ws"
    echo "  [+] Created: $ws"
  else
    echo "  [=] Already exists: $ws"
  fi
done
echo ""

# 6. Update .gitignore
echo "--- Git Ignore ---"
add_gitignore_entry "$GITIGNORE" ".claude/pre-dev-workspace/"
add_gitignore_entry "$GITIGNORE" ".claude/dev-workspace/"
echo ""

# 7. MCP availability check (informational only)
echo "--- MCP Requirements ---"
check_mcp "mcp-atlassian (Jira + Confluence)" "required"
check_mcp "framelink-figma-mcp (Figma)" "required"
check_mcp "cap-ui-library-mcp (Component docs)" "required"
check_mcp "Claude Preview (Visual QA)" "required"
check_mcp "Google Drive (PRD from Google Docs)" "optional"
echo ""
echo "  Note: MCP servers must be configured in your Claude Code settings."
echo "  The installer cannot verify MCP availability — check manually."
echo ""

echo "===================================="
echo "  Installation complete!"
echo ""
echo "  Reload Claude Code to pick up new commands, agents, and skills."
echo ""
echo "  Quick start:"
echo "    Pre-Dev: /pre-dev CAP-12345 --transcript=/path/to/transcript.txt"
echo "    Dev:     /dev-execute --lld=<confluence-id> --figma=fileId:frameId"
echo "===================================="
