-- Footer content
create table if not exists footer_content (
  id text primary key,
  tagline text,
  heading text,
  paragraph text,
  closing text,
  tagline_en text,
  heading_en text,
  paragraph_en text,
  closing_en text,
  updated_at timestamptz default now()
);
alter table footer_content enable row level security;
create policy "public read footer" on footer_content for select using (true);
create policy "anon write footer" on footer_content for all using (true) with check (true);

-- Challenges content
create table if not exists challenges_content (
  id text primary key,
  badge text,
  headline text,
  subheading text,
  paragraph text,
  badge_en text,
  headline_en text,
  subheading_en text,
  paragraph_en text,
  items jsonb default '[]',
  updated_at timestamptz default now()
);
alter table challenges_content enable row level security;
create policy "public read challenges" on challenges_content for select using (true);
create policy "anon write challenges" on challenges_content for all using (true) with check (true);

-- Operating model content
create table if not exists operating_model (
  id text primary key,
  badge text,
  tagline text,
  heading text,
  paragraph text,
  cycle_label text,
  badge_en text,
  tagline_en text,
  heading_en text,
  paragraph_en text,
  cycle_label_en text,
  steps jsonb default '[]',
  updated_at timestamptz default now()
);
alter table operating_model enable row level security;
create policy "public read operating_model" on operating_model for select using (true);
create policy "anon write operating_model" on operating_model for all using (true) with check (true);

-- Sectors content
create table if not exists sectors_content (
  id text primary key,
  badge text,
  heading text,
  paragraph text,
  teams_label text,
  teams_text text,
  coverage_label text,
  coverage_text text,
  commit_label text,
  sectors_ar jsonb default '[]',
  sectors_en jsonb default '[]',
  badge_en text,
  heading_en text,
  paragraph_en text,
  teams_label_en text,
  teams_text_en text,
  coverage_label_en text,
  coverage_text_en text,
  commit_label_en text,
  commitments jsonb default '[]',
  updated_at timestamptz default now()
);
alter table sectors_content enable row level security;
create policy "public read sectors" on sectors_content for select using (true);
create policy "anon write sectors" on sectors_content for all using (true) with check (true);
