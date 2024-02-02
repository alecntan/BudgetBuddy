create type role as enum (
    'admin',
    'director',
    'manager',
    'associate'
);

create table public.profiles (
    id uuid not null references auth.users on delete cascade,
    first_name text not null,
    last_name text not null,
    user_role role not null,

    primary key (id)
);



alter table public.profiles enable row level security;

create policy "User can see their own profile only." on profiles 
for select to authenticated
using ( auth.uid() = id );


