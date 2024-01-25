create type role as enum (
    'admin',
    'director',
    'manager',
    'associate'
);

create table public.profiles (
    id uuid not null references auth.users on delete cascade,
    first_name text,
    last_name text,
    user_role role,

    primary key (id)
);

alter table public.profiles enable row level security;

create policy "User can see their own profile only."
on profiles
for select using ( auth.uid() = id );
