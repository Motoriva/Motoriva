-- Run this once in your Supabase project's SQL Editor (Project -> SQL Editor -> New query).
-- It creates a "profiles" table that stores each customer's delivery details,
-- linked 1-to-1 with Supabase's own secure login system (auth.users).

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  first_name text,
  last_name text,
  street text,
  zip text,
  city text,
  country text,
  updated_at timestamptz default now()
);

-- Row Level Security: makes sure every customer can only ever read/write
-- their OWN row, never anyone else's - even though the anon key used in the
-- website is public.
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Automatically creates a profiles row (with first/last name) the moment
-- someone signs up, so the website never has to do it manually.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
