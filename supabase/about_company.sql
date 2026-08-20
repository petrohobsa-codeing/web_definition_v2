-- Table backing the "About the company" card (home page + About page).
-- Run once in the Supabase SQL editor.

create table if not exists public.about_company (
  id                 text primary key,
  photo              text,
  title_top          text,
  title_bottom       text,
  eyebrow            text,
  headline           text,
  paragraph          text,
  since_label        text,
  vision_label       text,
  vision_text        text,
  mission_label      text,
  mission_text       text,
  title_top_en       text,
  title_bottom_en    text,
  eyebrow_en         text,
  headline_en        text,
  paragraph_en       text,
  since_label_en     text,
  vision_label_en    text,
  vision_text_en     text,
  mission_label_en   text,
  mission_text_en    text,
  updated_at         timestamptz default now()
);

alter table public.about_company enable row level security;

-- Same access model as the other content tables: visitors read, the admin
-- panel (anon key, behind the admin login) writes.
drop policy if exists "about_company read"  on public.about_company;
drop policy if exists "about_company write" on public.about_company;

create policy "about_company read"  on public.about_company for select using (true);
create policy "about_company write" on public.about_company for all    using (true) with check (true);
