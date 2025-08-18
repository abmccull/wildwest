#!/bin/bash

# Load environment variables from .env file
if [ -f "/Users/abmccull/Desktop/Wildwest/.env" ]; then
    export $(grep -E '^supabase_personal_access_token=' /Users/abmccull/Desktop/Wildwest/.env | xargs)
fi

# Extract project ref from SUPABASE_URL if needed
PROJECT_REF="kbzhaqavljuvmyfltfqn"

# Run the MCP server with the access token
SUPABASE_ACCESS_TOKEN="$supabase_personal_access_token" npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref="$PROJECT_REF"