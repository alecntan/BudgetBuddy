create policy "Profiles can only be deleted by Admin users"
on profiles
for delete 
to authenticated
using( get_my_claim('budget_buddy_role') = '"admin"' );

create or replace function public.delete_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
    begin
        delete from auth.users where id = old.id;
        return new;
    end;
$$;

create or replace trigger on_delete_profile
after delete on public.profiles
for each row execute procedure public.delete_auth_user();
