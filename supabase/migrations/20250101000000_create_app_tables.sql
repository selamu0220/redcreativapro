-- Create main application tables

-- Users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid references auth.users(id) primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  subscription_status text default 'free',
  subscription_tier text default 'free',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text,
  status text default 'planning',
  priority text default 'medium',
  category text,
  tags text[],
  deadline timestamp with time zone,
  progress integer default 0,
  budget numeric,
  client_name text,
  client_email text,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
  ON projects FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  project_id uuid references projects(id),
  title text not null,
  description text,
  status text default 'pending',
  priority text default 'medium',
  category text,
  tags text[],
  due_date timestamp with time zone,
  completed_at timestamp with time zone,
  estimated_hours numeric,
  actual_hours numeric,
  assignee text,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Calendar events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  project_id uuid references projects(id),
  task_id uuid references tasks(id),
  title text not null,
  description text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  all_day boolean default false,
  location text,
  attendees text[],
  reminder_minutes integer,
  recurrence_rule text,
  color text default '#3b82f6',
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own events"
  ON calendar_events FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  content text not null,
  excerpt text,
  slug text unique,
  status text default 'draft',
  featured_image text,
  tags text[],
  category text,
  seo_title text,
  seo_description text,
  published_at timestamp with time zone,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Published posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  content text not null,
  category text not null,
  tags text[],
  is_favorite boolean default false,
  is_public boolean default false,
  usage_count integer default 0,
  variables jsonb default '[]',
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prompts"
  ON prompts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public prompts are viewable by everyone"
  ON prompts FOR SELECT
  TO authenticated
  USING (is_public = true);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text,
  type text not null, -- 'video', 'image', 'document', 'link', etc.
  url text,
  file_path text,
  file_size bigint,
  mime_type text,
  category text,
  tags text[],
  is_public boolean default false,
  download_count integer default 0,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own resources"
  ON resources FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public resources are viewable by everyone"
  ON resources FOR SELECT
  TO authenticated
  USING (is_public = true);

-- Scripts table
CREATE TABLE IF NOT EXISTS scripts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  project_id uuid references projects(id),
  title text not null,
  content text not null,
  type text default 'general', -- 'general', 'youtube', 'tiktok', 'instagram', etc.
  language text default 'es',
  duration_seconds integer,
  word_count integer,
  status text default 'draft',
  tags text[],
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own scripts"
  ON scripts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_id ON calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_blog_posts_user_id ON blog_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts(category);
CREATE INDEX IF NOT EXISTS idx_resources_user_id ON resources(user_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_scripts_user_id ON scripts(user_id);
CREATE INDEX IF NOT EXISTS idx_scripts_project_id ON scripts(project_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scripts_updated_at BEFORE UPDATE ON scripts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();