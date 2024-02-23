create table public.budgets (
    id serial primary key,
    name text not null,
    description text not null,
    owner uuid not null references auth.users on delete cascade
);

alter table public.budgets enable row level security;

create policy "Directors and Admins can create budgets." on budgets
for insert to authenticated
with check ( get_my_claim('budget_buddy_role') = '"admin"' OR get_my_claim('budget_buddy_role') = '"director"');
